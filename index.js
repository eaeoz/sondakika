#!/usr/bin/env node

const Parser = require('rss-parser')
const fs = require('fs')
const path = require('path')
const os = require('os')
const blessed = require('blessed')

const packagePath = path.join(__dirname, 'package.json')
const { version } = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

const STATE_DIR = path.join(os.homedir(), '.config', 'sondakika-cli')
const STATE_FILE = path.join(STATE_DIR, 'state.json')

const defaultCLIState = {
  lastSource: 'ntv',
  itemsPerPage: 10
}

function loadCLIState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'))
      return { ...defaultCLIState, ...data }
    }
  } catch (e) {}
  return { ...defaultCLIState }
}

function saveCLIState(state) {
  try {
    if (!fs.existsSync(STATE_DIR)) fs.mkdirSync(STATE_DIR, { recursive: true })
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8')
  } catch (e) {}
}

const sources = {
  ntv: 'https://www.ntv.com.tr/son-dakika.rss',
  cumhuriyet: 'http://www.cumhuriyet.com.tr/rss/son_dakika.xml',
  trt: 'https://www.trthaber.com/sondakika.rss',
  mynet: 'https://www.mynet.com/haber/rss/sondakika',
  sabah: 'https://www.sabah.com.tr/rss/anasayfa.xml',
  star: 'https://www.star.com.tr/rss/rss.asp?cid=124',
  vatan: 'https://www.gazetevatan.com/rss/gundem.xml',
  haberturk: 'https://www.haberturk.com/rss',
  cnnturk: 'https://cnnturk.com/feed/rss/turkiye',
  yenisafak: 'https://www.yenisafak.com/rss',
  aa: 'https://www.aa.com.tr/en/rss'
}

const sourceInfo = {
  ntv: { name: 'NTV', isSondakika: true },
  cumhuriyet: { name: 'Cumhuriyet', isSondakika: true },
  trt: { name: 'TRT Haber', isSondakika: true },
  mynet: { name: 'Mynet', isSondakika: true },
  sabah: { name: 'Sabah', isSondakika: false },
  star: { name: 'Star', isSondakika: false },
  vatan: { name: 'Gazete Vatan', isSondakika: false },
  haberturk: { name: 'Habertürk', isSondakika: false },
  cnnturk: { name: 'CNN Türk', isSondakika: false },
  yenisafak: { name: 'Yeni Şafak', isSondakika: false },
  aa: { name: 'Anadolu Ajansı', isSondakika: false }
}

const parser = new Parser()
const ITEMS_PER_PAGE = 10

function formatDate(pubDate) {
  if (!pubDate) return ''
  const date = new Date(pubDate)
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

async function fetchNews(source, count) {
  const url = sources[source.toLowerCase()]
  if (!url) {
    console.error(`Unknown source: ${source}`)
    console.log(`Available sources: ${Object.keys(sources).join(', ')}`)
    process.exit(1)
  }

  try {
    const feed = await parser.parseURL(url)
    return feed.items.slice(0, count)
  } catch (err) {
    console.error('Error fetching news:', err.message)
    process.exit(1)
  }
}

function wrapText(text, width) {
  const lines = []
  let start = 0
  while (start < text.length) {
    let end = Math.min(start + width, text.length)
    if (end < text.length && end > start) {
      const lastSpace = text.lastIndexOf(' ', end)
      if (lastSpace > start && lastSpace > end - width / 2) {
        end = lastSpace
      }
    }
    lines.push(text.substring(start, end).trim())
    start = end
    while (start < text.length && text[start] === ' ') {
      start++
    }
  }
  return lines.length ? lines : ['']
}

function createScreen() {
  return blessed.screen({
    smartCSR: true,
    title: 'Sondakika Haberler'
  })
}

function createMainList(screen, items, sourceName) {
  const list = blessed.list({
    parent: screen,
    top: 2,
    left: 0,
    width: '100%',
    height: '100%-4',
    tags: true,
    keys: false,
    mouse: false,
    border: null,
    style: {
      selected: {
        fg: 'white',
        bg: 'blue'
      }
    },
    scrollbar: {
      ch: '█',
      inverse: true
    }
  })

  list.focus()

  const header = blessed.box({
    parent: screen,
    top: 0,
    left: 0,
    width: '100%',
    height: 2,
    content: `{bold}📰 ${sourceName}{/bold} - {cyan-fg}▲/▼{/cyan-fg} Seç, {cyan-fg}◄/►{/cyan-fg} Sayfa, {cyan-fg}Enter{/cyan-fg} Görüntüle, {cyan-fg}Q{/cyan-fg} Çıkış`,
    tags: true,
    style: {
      fg: 'white',
      bg: 'blue'
    }
  })

  const footer = blessed.box({
    parent: screen,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 2,
    content: '{cyan-fg}▲{/cyan-fg} Yukarı  {cyan-fg}▼{/cyan-fg} Aşağı  {cyan-fg}◄{/cyan-fg} Önceki Sayfa  {cyan-fg}►{/cyan-fg} Sonraki Sayfa  {cyan-fg}Enter{/cyan-fg} Görüntüle  {cyan-fg}Q{/cyan-fg} Çıkış',
    tags: true,
    style: {
      fg: 'white',
      bg: 'black'
    }
  })

  return { list, header, footer }
}

function createFullScreenView(screen) {
  const overlay = blessed.box({
    parent: screen,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: 'cyan'
      }
    },
    hidden: true,
    scrollable: true,
    alwaysScroll: true,
    scrolloffset: 1
  })

  const closeHint = blessed.box({
    parent: overlay,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    content: '{center}Enter ile listeye dön{/center}',
    tags: true,
    style: {
      fg: 'black',
      bg: 'cyan'
    }
  })

  return { overlay, closeHint }
}

function updateListDisplay(list, items, page, totalPages) {
  const start = page * ITEMS_PER_PAGE
  const end = Math.min(start + ITEMS_PER_PAGE, items.length)
  const pageItems = items.slice(start, end)

  const lines = pageItems.map((item, idx) => {
    const globalIdx = start + idx + 1
    const dateStr = formatDate(item.pubDate || item.isodate)
    const titleLines = wrapText(item.title, 60)
    let line = `{bold}${globalIdx}.{/bold} ${titleLines[0]}`
    if (dateStr) {
      line += ` {gray-fg}[${dateStr}]{/gray-fg}`
    }
    return line
  })

  list.setItems(lines)
  list.scrollTo(0)
}

function showFullScreen(overlay, item) {
  const title = item.title || 'Başlık yok'
  const dateStr = formatDate(item.pubDate || item.isodate)
  const summary = item.summary || item.contentSnippet || item.content || 'İçerik yok'
  const link = item.link || ''

  const titleLines = wrapText(title, 70)
  const summaryLines = wrapText(summary, 70)

  let content = '{bold}' + titleLines.join('\n') + '{/bold}\n\n'

  if (dateStr) {
    content += `{gray-fg}📅 ${dateStr}{/gray-fg}\n\n`
  }

  content += summaryLines.join('\n') + '\n\n'

  if (link) {
    content += `{cyan-fg}🔗 ${link}{/cyan-fg}`
  }

  overlay.setContent(content)
  overlay.show()
}

function hideFullScreen(overlay) {
  overlay.hide()
}

async function main() {
  const args = process.argv.slice(2)
  const cliState = loadCLIState()

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
📰 Sondakika v${version} - Son dakika haberleri CLI

Usage:
  sondakika <source> [count]
  sondakika --version
  sondakika --help

Sources (Son Dakika):
  ntv         NTV Son Dakika
  cumhuriyet  Cumhuriyet
  trt         TRT Haber
  mynet       Mynet

Sources (Haberler):
  sabah       Sabah
  star        Star
  vatan       Gazete Vatan
  haberturk   Habertürk
  cnnturk     CNN Türk
  yenisafak   Yeni Şafak
  aa          Anadolu Ajansı

Examples:
  sondakika ntv           # NTV haberleri (varsayilan 10 adet)
  sondakika ntv 15        # NTV 15 haber
  sondakika trt           # TRT Haber
  sondakika mynet 5       # Mynet 5 haber
  sondakika sabah         # Sabah haberleri
  sondakika haberturk 5   # Habertürk 5 haber
`)
    process.exit(0)
  }

  if (args[0] === '--version' || args[0] === '-v') {
    console.log(`sondakika v${version}`)
    process.exit(0)
  }

  const source = args[0] || cliState.lastSource
  const count = args[1] ? parseInt(args[1]) : cliState.itemsPerPage

  // Save the source and count for next time
  cliState.lastSource = source
  cliState.itemsPerPage = count
  saveCLIState(cliState)

  const sourceKey = source.toLowerCase()
  const info = sourceInfo[sourceKey] || { name: source.toUpperCase(), isSondakika: false }
  const sourceName = info.isSondakika ? `${info.name} (Son Dakika)` : info.name

  const screen = createScreen()
  const { list, header, footer } = createMainList(screen, [], sourceName)
  const { overlay, closeHint } = createFullScreenView(screen)

  let items = []
  let currentPage = 0
  let totalPages = 0
  let inFullScreen = false

  const loadNews = async () => {
    header.setContent(`{bold}📰 ${sourceName}{/bold} - Yükleniyor...`)
    screen.render()

    items = await fetchNews(source, count)
    totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)
    currentPage = 0

    updateListDisplay(list, items, currentPage, totalPages)
    list.select(0)
    header.setContent(`{bold}📰 ${sourceName}{/bold} - {cyan-fg}▲/▼{/cyan-fg} Seç, {cyan-fg}◄/►{/cyan-fg} Sayfa, {cyan-fg}Enter{/cyan-fg} Görüntüle, {cyan-fg}Q{/cyan-fg} Çıkış`)
    footer.setContent(`{cyan-fg}▲{/cyan-fg} Yukarı  {cyan-fg}▼{/cyan-fg} Aşağı  {cyan-fg}◄{/cyan-fg} Önceki Sayfa (${currentPage + 1}/${totalPages})  {cyan-fg}►{/cyan-fg} Sonraki Sayfa  {cyan-fg}Enter{/cyan-fg} Görüntüle  {cyan-fg}Q{/cyan-fg} Çıkış`)
    screen.render()
  }

  const updateFooter = () => {
    footer.setContent(`{cyan-fg}▲{/cyan-fg} Yukarı  {cyan-fg}▼{/cyan-fg} Aşağı  {cyan-fg}◄{/cyan-fg} Önceki Sayfa (${currentPage + 1}/${totalPages})  {cyan-fg}►{/cyan-fg} Sonraki Sayfa  {cyan-fg}Enter{/cyan-fg} Görüntüle  {cyan-fg}Q{/cyan-fg} Çıkış`)
  }

  const goToPrevPage = () => {
    if (currentPage > 0) {
      currentPage--
      updateListDisplay(list, items, currentPage, totalPages)
      list.select(0)
      updateFooter()
      screen.render()
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      currentPage++
      updateListDisplay(list, items, currentPage, totalPages)
      list.select(0)
      updateFooter()
      screen.render()
    }
  }

  const openFullScreen = () => {
    const start = currentPage * ITEMS_PER_PAGE
    const itemIndex = start + list.selected
    if (itemIndex < items.length) {
      showFullScreen(overlay, items[itemIndex])
      inFullScreen = true
      screen.render()
    }
  }

  const closeFullScreen = () => {
    hideFullScreen(overlay)
    inFullScreen = false
    screen.render()
  }

  screen.key(['up'], () => {
    if (!inFullScreen) {
      list.up()
      screen.render()
    }
  })

  screen.key(['down'], () => {
    if (!inFullScreen) {
      list.down()
      screen.render()
    }
  })

  screen.key(['left'], () => {
    if (!inFullScreen) {
      goToPrevPage()
    }
  })

  screen.key(['right'], () => {
    if (!inFullScreen) {
      goToNextPage()
    }
  })

  screen.key(['enter'], () => {
    if (inFullScreen) {
      closeFullScreen()
    } else {
      openFullScreen()
    }
  })

  // Use Escape, Q, or Ctrl+C to quit
  screen.unkey(['q', 'C-c'])
  screen.key(['escape', 'q', 'Q', 'C-c'], () => {
    process.exit(0)
  })

  list.on('select', (el, idx) => {
    openFullScreen()
  })

  await loadNews()

  screen.render()
}

main().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
