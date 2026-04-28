const { app, BrowserWindow, ipcMain, shell } = require('electron')
const path = require('path')
const fs = require('fs')
const Parser = require('rss-parser')

let mainWindow
let articleWindow = null
let articleWindowData = { newsItems: [], currentIndex: 0 }

const parser = new Parser({
  timeout: 10000,
  requestOptions: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  },
  maxRedirects: 5
})

const dataDir = path.join(app.getPath('userData'), 'data')
const stateFile = path.join(dataDir, 'state.json')

const sources = {
  cumhuriyet: { name: 'Cumhuriyet', url: 'https://www.cumhuriyet.com.tr/rss/son_dakika.xml', isSondakika: true },
  trt: { name: 'TRT Haber', url: 'https://www.trthaber.com/sondakika.rss', isSondakika: true },
  mynet: { name: 'Mynet', url: 'https://www.mynet.com/haber/rss/sondakika', isSondakika: true },
  sabah: { name: 'Sabah', url: 'https://www.sabah.com.tr/rss/anasayfa.xml', isSondakika: false },
  star: { name: 'Star', url: 'https://www.star.com.tr/rss/rss.asp?cid=124', isSondakika: false },
  vatan: { name: 'Gazete Vatan', url: 'https://www.gazetevatan.com/rss/gundem.xml', isSondakika: false },
  haberturk: { name: 'Haberturk', url: 'https://www.haberturk.com/rss', isSondakika: false },
  cnnturk: { name: 'CNN Turk', url: 'https://cnnturk.com/feed/rss/turkiye', isSondakika: false },
  yenisafak: { name: 'Yeni Safak', url: 'https://www.yenisafak.com/rss', isSondakika: false },
  aa: { name: 'Anadolu Ajansi', url: 'https://www.aa.com.tr/en/rss', isSondakika: false }
}

const defaultState = {
  enabledSources: ['cumhuriyet', 'trt', 'mynet', 'haberturk', 'cnnturk'],
  sortOrder: 'desc',
  itemsPerPage: 10,
  currentPage: 1,
  windowBounds: null,
  fontSize: 16,
  theme: 'dark'
}

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

function loadState() {
  ensureDataDir()
  try {
    if (fs.existsSync(stateFile)) {
      const data = fs.readFileSync(stateFile, 'utf8')
      return { ...defaultState, ...JSON.parse(data) }
    }
  } catch (err) {
    console.error('Error loading state:', err)
  }
  return { ...defaultState }
}

function saveState(state) {
  ensureDataDir()
  try {
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), 'utf8')
  } catch (err) {
    console.error('Error saving state:', err)
  }
}

function createWindow() {
  const state = loadState()
  const bounds = state.windowBounds || { width: 1200, height: 800 }

  mainWindow = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    backgroundColor: '#1a1a2e',
    show: false,
    frame: true,
    autoHideMenuBar: true
  })

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('close', () => {
    saveWindowBounds()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function extractImage(item, contentHtml, sourceKey) {
  if (item.enclosure && item.enclosure.url && item.enclosure.type && item.enclosure.type.startsWith('image')) {
    return item.enclosure.url
  }
  if (item.thumbnail) return item.thumbnail.url
  if (item.media && item.media.content && item.media.content.url) return item.media.content.url
  if (item['media:content'] && item['media:content'].url) return item['media:content'].url
  if (item['media:thumbnail'] && item['media:thumbnail'].url) return item['media:thumbnail'].url
  if (item['itunes:image'] && item['itunes:image'].href) return item['itunes:image'].href
  if (!contentHtml) return null

  if (sourceKey === 'vatan') {
    const vatanPattern = /https:\/\/image\.gazetevatan\.com\/[^"'\s<>]+\.jpg/i
    const vatanMatch = contentHtml.match(vatanPattern)
    if (vatanMatch) {
      let url = vatanMatch[0]
      const firstJpg = url.indexOf('.jpg')
      if (firstJpg !== -1) url = url.substring(0, firstJpg + 4)
      return url
    }
  }

  const srcPattern = /src=["']([^"']+\.(jpg|jpeg|png|webp)[^"']*)["']/i
  const match = contentHtml.match(srcPattern)
  if (match && match[1]) {
    const url = match[1]
    const extMatch = url.match(/\.(jpg|jpeg|png|webp)/i)
    if (extMatch) {
      const baseUrl = url.substring(0, url.indexOf(extMatch[0]) + extMatch[0].length)
      return baseUrl
    }
    return url
  }
  return null
}

const WRONG_TZ_SOURCES = new Set(['cnnturk', 'yenisafak'])

function fixPublishedDate(dateStr, sourceKey) {
  if (!dateStr) return dateStr
  if (!WRONG_TZ_SOURCES.has(sourceKey)) return dateStr
  const ts = Date.parse(dateStr)
  if (isNaN(ts)) return dateStr
  return new Date(ts - 3 * 60 * 60 * 1000).toISOString()
}

async function fetchAllNews(enabledSources) {
  const results = []
  for (const sourceKey of enabledSources) {
    const source = sources[sourceKey]
    if (!source) continue
    try {
      const feed = await parser.parseURL(source.url)
      const items = feed.items.map(item => {
        const fields = [
          item['content:encoded'], item.content, item.contentSnippet,
          item.summary, item.description
        ]
        let bestContent = ''
        let bestContentRaw = ''
        for (const field of fields) {
          if (field) {
            const cleaned = cleanHtml(field)
            if (cleaned.length > bestContent.length) {
              bestContent = cleaned
              bestContentRaw = field
            }
          }
        }
        if (!bestContent || bestContent.length < 50) {
          bestContent = item.title || ''
          bestContentRaw = item.title || ''
        }
        const imageUrl = extractImage(item, bestContentRaw, sourceKey)
        return {
          ...item,
          pubDate: fixPublishedDate(item.pubDate, sourceKey),
          isoDate: fixPublishedDate(item.isoDate, sourceKey),
          sourceKey,
          sourceName: source.name,
          isSondakika: source.isSondakika,
          fullContent: bestContent,
          imageUrl,
          newsTitle: item.title
        }
      })
      results.push(...items)
    } catch (err) {
      console.error(`Error fetching ${sourceKey}:`, err.message)
    }
  }
  return results
}

function cleanHtml(html) {
  if (!html) return ''
  let text = html.replace(/<p[^>]*>/gi, '\n').replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '')
  text = text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim()
  text = text.replace(/\n+/g, '\n').trim()
  return text
}

function sortNews(items, sortOrder) {
  return items.sort((a, b) => {
    const dateA = new Date(a.pubDate || a.isoDate || 0)
    const dateB = new Date(b.pubDate || b.isoDate || 0)
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
  })
}

function saveWindowBounds() {
  if (!mainWindow || mainWindow.isDestroyed()) return
  const state = loadState()
  state.windowBounds = mainWindow.getBounds()
  saveState(state)
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('get-sources', () => sources)

ipcMain.handle('get-state', () => loadState())

ipcMain.handle('save-state', (event, state) => {
  saveState(state)
  return true
})

ipcMain.handle('set-font-size', (event, fontSize) => {
  const state = loadState()
  state.fontSize = fontSize
  saveState(state)
  return true
})

ipcMain.handle('set-theme', (event, theme) => {
  const state = loadState()
  state.theme = theme
  saveState(state)
  return true
})

ipcMain.handle('fetch-news', async (event, enabledSources, sortOrder) => {
  let items = await fetchAllNews(enabledSources)
  items = sortNews(items, sortOrder)
  return items
})

ipcMain.handle('open-external', async (event, url) => {
  await shell.openExternal(url)
  return true
})

// Article View Window
ipcMain.handle('open-article-view', async (event, newsItems, currentIndex) => {
  if (articleWindow && !articleWindow.isDestroyed()) {
    articleWindowData = { newsItems, currentIndex, fontSize: loadState().fontSize || 16 }
    articleWindow.focus()
    articleWindow.webContents.send('article-view-navigate', articleWindowData)
    return true
  }

  articleWindowData = { newsItems, currentIndex, fontSize: loadState().fontSize || 16 }
  const state = loadState()
  const mainBounds = mainWindow ? mainWindow.getBounds() : { width: 1200, height: 800, x: 100, y: 50 }

  articleWindow = new BrowserWindow({
    width: mainBounds.width,
    height: mainBounds.height,
    x: mainBounds.x,
    y: mainBounds.y,
    minWidth: 700,
    minHeight: 500,
    parent: mainWindow,
    webPreferences: {
      preload: path.join(__dirname, 'article-preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    backgroundColor: '#0f0f1a',
    show: false,
    frame: true,
    autoHideMenuBar: true,
    title: 'Haber Goruntule'
  })

  articleWindow.loadFile(path.join(__dirname, '../renderer/article-view.html'))

  articleWindow.once('ready-to-show', () => {
    articleWindow.show()
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.hide()
  })

  articleWindow.on('closed', () => {
    articleWindow = null
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.show()
      mainWindow.focus()
      mainWindow.webContents.send('article-view-closed', articleWindowData.currentIndex)
    }
  })

  return true
})

ipcMain.handle('article-view-get-data', () => articleWindowData)

ipcMain.handle('article-view-close', (event, currentIndex) => {
  articleWindowData.currentIndex = currentIndex
  if (articleWindow && !articleWindow.isDestroyed()) {
    articleWindow.close()
  }
  return true
})
