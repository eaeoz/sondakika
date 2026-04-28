#!/usr/bin/env node

const blessed = require('blessed');
const RssParser = require('rss-parser');
const fs = require('fs');
const path = require('path');
const os = require('os');

const packagePath = path.join(__dirname, 'package.json');
const { version } = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

const STATE_DIR = path.join(os.homedir(), '.config', 'sondakika-cli');
const STATE_FILE = path.join(STATE_DIR, 'state.json');

const defaultCLIState = {
  lastSource: 'trt',
  itemsPerPage: 10
};

function loadCLIState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
      return { ...defaultCLIState, ...data };
    }
  } catch (e) {}
  return { ...defaultCLIState };
}

function saveCLIState(state) {
  try {
    if (!fs.existsSync(STATE_DIR)) fs.mkdirSync(STATE_DIR, { recursive: true });
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (e) {}
}

// Sources with working URLs (mix of HTTP and HTTPS as per original root index.js)
const sources = {
  cumhuriyet: { 
    name: 'Cumhuriyet', 
    url: 'https://www.cumhuriyet.com.tr/rss/son_dakika.xml', 
    isSondakika: true 
  },
  trt: { 
    name: 'TRT Haber', 
    url: 'https://www.trthaber.com/sondakika.rss', 
    isSondakika: true 
  },
  mynet: { 
    name: 'Mynet', 
    url: 'https://www.mynet.com/haber/rss/sondakika', 
    isSondakika: true 
  },
  sabah: { 
    name: 'Sabah', 
    url: 'https://www.sabah.com.tr/rss/anasayfa.xml', 
    isSondakika: false 
  },
  star: { 
    name: 'Star', 
    url: 'https://www.star.com.tr/rss/rss.asp?cid=124', 
    isSondakika: false 
  },
  vatan: { 
    name: 'Gazete Vatan', 
    url: 'https://www.gazetevatan.com/rss/gundem.xml', 
    isSondakika: false 
  },
  haberturk: { 
    name: 'Haberturk', 
    url: 'https://www.haberturk.com/rss', 
    isSondakika: false 
  },
  cnnturk: { 
    name: 'CNN Turk', 
    url: 'https://cnnturk.com/feed/rss/turkiye', 
    isSondakika: false 
  },
  yenisafak: { 
    name: 'Yeni Safak', 
    url: 'https://www.yenisafak.com/rss', 
    isSondakika: false 
  },
  aa: { 
    name: 'Anadolu Ajansi', 
    url: 'https://www.aa.com.tr/en/rss', 
    isSondakika: false 
  }
};

const parser = new RssParser({
  timeout: 10000,
  requestOptions: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  },
  maxRedirects: 5
});

const ITEMS_PER_PAGE = 10;

function formatDate(pubDate) {
  if (!pubDate) return '';
  const date = new Date(pubDate);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

async function fetchNews(sourceKey, count) {
  const source = sources[sourceKey.toLowerCase()];
  if (!source) {
    console.error(`Unknown source: ${sourceKey}`);
    console.log(`Available sources: ${Object.keys(sources).join(', ')}`);
    process.exit(1);
  }

  try {
    console.error(`Fetching from: ${source.url}`); // Debug output to stderr
    const feed = await parser.parseURL(source.url);
    console.error(`Fetched ${feed.items.length} items`); // Debug output
    
    if (!feed.items || feed.items.length === 0) {
      console.error(`No items found in feed from ${source.name}`);
      process.exit(1);
    }
    
    return feed.items.slice(0, count);
  } catch (err) {
    console.error('Error fetching news:', err.message);
    console.error(`URL: ${source.url}`);
    console.error(`Source: ${source.name}`);
    process.exit(1);
  }
}

function wrapText(text, width) {
  const lines = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + width, text.length);
    if (end < text.length && end > start) {
      const lastSpace = text.lastIndexOf(' ', end);
      if (lastSpace > start && lastSpace > end - width / 2) {
        end = lastSpace;
      }
    }
    lines.push(text.substring(start, end).trim());
    start = end;
    while (start < text.length && text[start] === ' ') {
      start++;
    }
  }
  return lines.length ? lines : [''];
}

function createScreen() {
  return blessed.screen({
    smartCSR: true,
    title: 'Sondakika Haberler'
  });
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
  });

  list.focus();

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
  });

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
  });

  return { list, header, footer };
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
  });

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
  });

  return { overlay, closeHint };
}

function updateListDisplay(list, items, page, totalPages) {
  const start = page * ITEMS_PER_PAGE;
  const end = Math.min(start + ITEMS_PER_PAGE, items.length);
  const pageItems = items.slice(start, end);

  const lines = pageItems.map((item, idx) => {
    const globalIdx = start + idx + 1;
    const dateStr = formatDate(item.pubDate || item.isodate);
    const titleLines = wrapText(item.title, 60);
    let line = `{bold}${globalIdx}.{/bold} ${titleLines[0]}`;
    if (dateStr) {
      line += ` {gray-fg}[${dateStr}]{/gray-fg}`;
    }
    return line;
  });

  list.setItems(lines);
  list.scrollTo(0);
}

function showFullScreen(overlay, item) {
  const title = item.title || 'Başlık yok';
  const dateStr = formatDate(item.pubDate || item.isodate);
  const summary = item.summary || item.contentSnippet || item.content || 'İçerik yok';
  const link = item.link || '';

  const titleLines = wrapText(title, 70);
  const summaryLines = wrapText(summary, 70);

  let content = '{bold}' + titleLines.join('\n') + '{/bold}\n\n';

  if (dateStr) {
    content += `{gray-fg}📅 ${dateStr}{/gray-fg}\n\n`;
  }

  content += summaryLines.join('\n') + '\n\n';

  if (link) {
    content += `{cyan-fg}🔗 ${link}{/cyan-fg}`;
  }

  overlay.setContent(content);
  overlay.show();
}

function hideFullScreen(overlay) {
  overlay.hide();
}

async function main() {
  const args = process.argv.slice(2);
  const cliState = loadCLIState();

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    const breakingSrc = Object.entries(sources)
      .filter(([k, v]) => v.isSondakika)
      .map(([k, v]) => `  ${k.padEnd(12)} ${v.name}`)
      .join('\n');
    const generalSrc = Object.entries(sources)
      .filter(([k, v]) => !v.isSondakika)
      .map(([k, v]) => `  ${k.padEnd(12)} ${v.name}`)
      .join('\n');
    console.log(`
📰 Sondakika v${version} - Türkçe Haber Okuyucu (CLI)
Tam özellikli terminal haber okuyucu

Kullanım:
  sondakika <kaynak> [adet]
  sondakika --version
  sondakika --help

Kaynaklar (Son Dakika):
${breakingSrc}

Kaynaklar (Haberler):
${generalSrc}

Örnekler:
   sondakika cumhuriyet    # Cumhuriyet haberleri
   sondakika trt 15        # TRT 15 haber
   sondakika mynet 5       # Mynet 5 haber
   sondakika sabah         # Sabah haberleri
   sondakika haberturk 5   # Habertürk 5 haber
   sondakika cnnturk       # CNN Türk haberleri
 `);
    process.exit(0);
  }

  if (args[0] === '--version' || args[0] === '-v') {
    console.log(`sondakika v${version}`);
    process.exit(0);
  }

  const sourceKey = args[0] ? args[0].toLowerCase() : cliState.lastSource;
  const count = args[1] ? parseInt(args[1]) : 1000; // Default to max (fetch all available news)

  const source = sources[sourceKey];
  if (!source) {
    console.error(`Unknown source: ${sourceKey}`);
    console.log(`Available sources: ${Object.keys(sources).join(', ')}`);
    process.exit(1);
  }

  // Save the source and count for next time
  cliState.lastSource = sourceKey;
  cliState.itemsPerPage = count;
  saveCLIState(cliState);

  const sourceName = source.isSondakika ? `${source.name} (Son Dakika)` : source.name;

  const screen = createScreen();
  const { list, header, footer } = createMainList(screen, [], sourceName);
  const { overlay, closeHint } = createFullScreenView(screen);

  let items = [];
  let currentPage = 0;
  let totalPages = 0;
  let inFullScreen = false;

  const loadNews = async () => {
    header.setContent(`{bold}📰 ${sourceName}{/bold} - Yükleniyor...`);
    screen.render();

    items = await fetchNews(sourceKey, count);
    totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
    currentPage = 0;

    updateListDisplay(list, items, currentPage, totalPages);
    list.select(0);
    header.setContent(`{bold}📰 ${sourceName}{/bold} - {cyan-fg}▲/▼{/cyan-fg} Seç, {cyan-fg}◄/►{/cyan-fg} Sayfa, {cyan-fg}Enter{/cyan-fg} Görüntüle, {cyan-fg}Q{/cyan-fg} Çıkış`);
    footer.setContent(`{cyan-fg}▲{/cyan-fg} Yukarı  {cyan-fg}▼{/cyan-fg} Aşağı  {cyan-fg}◄{/cyan-fg} Önceki Sayfa (${currentPage + 1}/${totalPages})  {cyan-fg}►{/cyan-fg} Sonraki Sayfa  {cyan-fg}Enter{/cyan-fg} Görüntüle  {cyan-fg}Q{/cyan-fg} Çıkış`);
    screen.render();
  };

  const updateFooter = () => {
    footer.setContent(`{cyan-fg}▲{/cyan-fg} Yukarı  {cyan-fg}▼{/cyan-fg} Aşağı  {cyan-fg}◄{/cyan-fg} Önceki Sayfa (${currentPage + 1}/${totalPages})  {cyan-fg}►{/cyan-fg} Sonraki Sayfa  {cyan-fg}Enter{/cyan-fg} Görüntüle  {cyan-fg}Q{/cyan-fg} Çıkış`);
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      currentPage--;
      updateListDisplay(list, items, currentPage, totalPages);
      list.select(0);
      updateFooter();
      screen.render();
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateListDisplay(list, items, currentPage, totalPages);
      list.select(0);
      updateFooter();
      screen.render();
    }
  };

  const openFullScreen = () => {
    const start = currentPage * ITEMS_PER_PAGE;
    const itemIndex = start + list.selected;
    if (itemIndex < items.length) {
      showFullScreen(overlay, items[itemIndex]);
      inFullScreen = true;
      screen.render();
    }
  };

  const closeFullScreen = () => {
    hideFullScreen(overlay);
    inFullScreen = false;
    screen.render();
  };

  screen.key(['up'], () => {
    if (!inFullScreen) {
      list.up();
      screen.render();
    }
  });

  screen.key(['down'], () => {
    if (!inFullScreen) {
      list.down();
      screen.render();
    }
  });

  screen.key(['left'], () => {
    if (!inFullScreen) {
      goToPrevPage();
    }
  });

  screen.key(['right'], () => {
    if (!inFullScreen) {
      goToNextPage();
    }
  });

  screen.key(['enter'], () => {
    if (inFullScreen) {
      closeFullScreen();
    } else {
      openFullScreen();
    }
  });

  // Use Escape, Q, or Ctrl+C to quit
  screen.unkey(['q', 'C-c']);
  screen.key(['escape', 'q', 'Q', 'C-c'], () => {
    process.exit(0);
  });

  list.on('select', (el, idx) => {
    openFullScreen();
  });

  await loadNews();

  screen.render();
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
