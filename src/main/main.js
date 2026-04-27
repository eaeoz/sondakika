const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const Parser = require('rss-parser');

let mainWindow;
const parser = new Parser();
const dataDir = path.join(app.getPath('userData'), 'data');
const stateFile = path.join(dataDir, 'state.json');

const sources = {
  ntv: { name: 'NTV', url: 'https://www.ntv.com.tr/son-dakika.rss', isSondakika: true },
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
};

const defaultState = {
  enabledSources: ['ntv', 'cumhuriyet', 'trt', 'mynet', 'haberturk', 'cnnturk'],
  sortOrder: 'desc',
  itemsPerPage: 10,
  currentPage: 1
};

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function loadState() {
  ensureDataDir();
  try {
    if (fs.existsSync(stateFile)) {
      const data = fs.readFileSync(stateFile, 'utf8');
      return { ...defaultState, ...JSON.parse(data) };
    }
  } catch (err) {
    console.error('Error loading state:', err);
  }
  return { ...defaultState };
}

function saveState(state) {
  ensureDataDir();
  try {
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving state:', err);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
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
  });

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function fetchAllNews(enabledSources) {
  const results = [];
  
  for (const sourceKey of enabledSources) {
    const source = sources[sourceKey];
    if (!source) continue;
    
    try {
      const feed = await parser.parseURL(source.url);
      const items = feed.items.map(item => {
        const fullContent = item.content || item['content:encoded'] || item.contentSnippet || item.summary || '';
        return {
          ...item,
          sourceKey,
          sourceName: source.name,
          isSondakika: source.isSondakika,
          fullContent: cleanHtml(fullContent)
        };
      });
      results.push(...items);
    } catch (err) {
      console.error(`Error fetching ${sourceKey}:`, err.message);
    }
  }
  
  return results;
}

function cleanHtml(html) {
  if (!html) return '';
  let text = html.replace(/<p[^>]*>/gi, '\n\n').replace(/<\/p>/gi, '').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '');
  text = text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
  return text;
}

function sortNews(items, sortOrder) {
  return items.sort((a, b) => {
    const dateA = new Date(a.pubDate || a.isoDate || 0);
    const dateB = new Date(b.pubDate || b.isoDate || 0);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });
}

app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('get-sources', () => {
  return sources;
});

ipcMain.handle('get-state', () => {
  return loadState();
});

ipcMain.handle('save-state', (event, state) => {
  saveState(state);
  return true;
});

ipcMain.handle('fetch-news', async (event, enabledSources, sortOrder) => {
  let items = await fetchAllNews(enabledSources);
  items = sortNews(items, sortOrder);
  return items;
});

ipcMain.handle('open-external', async (event, url) => {
  await shell.openExternal(url);
  return true;
});