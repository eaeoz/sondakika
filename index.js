#!/usr/bin/env node

const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, 'package.json');
const { version } = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

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
};

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
};

const parser = new Parser();

function wrapText(text, width = 68) {
  const lines = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + width, text.length);
    if (end < text.length) {
      lines.push(text.substring(start, end));
    } else {
      lines.push(text.substring(start));
    }
    start = end;
  }
  return lines;
}

function separator() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

async function fetchNews(source, count) {
  const url = sources[source.toLowerCase()];
  if (!url) {
    console.error(`Unknown source: ${source}`);
    console.log(`Available sources: ${Object.keys(sources).join(', ')}`);
    process.exit(1);
  }

  try {
    const feed = await parser.parseURL(url);
    const items = feed.items.slice(0, count);
    
    const firstItem = feed.items[0];
    let latestUpdate = '';
    if (firstItem && (firstItem.pubDate || firstItem.isodate)) {
      const date = new Date(firstItem.pubDate || firstItem.isodate);
      if (!isNaN(date.getTime())) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        latestUpdate = date.toLocaleDateString('tr-TR', options);
      }
    }
    
    const sourceKey = source.toLowerCase();
    const info = sourceInfo[sourceKey] || { name: source.toUpperCase(), isSondakika: false };
    const sourceName = info.isSondakika ? `${info.name} (Son Dakika)` : info.name;
    
    console.log('\n📰 ' + '═'.repeat(50));
    console.log(`   Latest ${items.length} News from ${sourceName}`);
    if (latestUpdate) {
      console.log(`   Son guncelleme: ${latestUpdate}`);
    }
    console.log('   ' + '═'.repeat(50) + '\n');
    
    items.forEach((item, index) => {
      const title = item.title;
      const summary = item.summary || item.contentSnippet || '';
      const link = item.link;
      const pubDate = item.pubDate || item.isodate;
      
      let dateStr = '';
      if (pubDate) {
        const date = new Date(pubDate);
        if (!isNaN(date.getTime())) {
          const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
          dateStr = date.toLocaleDateString('tr-TR', options);
        }
      }
      
      const titleLines = wrapText(title, 60);
      const summaryLines = wrapText(summary, 60);
      
      const maxWidth = Math.max(
        ...titleLines.map(l => l.length),
        ...summaryLines.map(l => l.length),
        dateStr.length,
        3
      );
      
      const borderWidth = Math.min(maxWidth + 1, 70);
      const clickableUrl = `\u001b]8;;${link}\u0007${link}\u001b]8;;\u0007`;
      
      console.log(`  ┌─ ${index + 1}. ${titleLines[0]}`);
      titleLines.slice(1).forEach(line => {
        console.log(`  │   ${line}`);
      });
      console.log(`  │`);
      
      if (dateStr) {
        console.log(`  │   📅 ${dateStr}`);
        console.log(`  │`);
      }
      
      summaryLines.forEach(line => {
        console.log(`  │   ${line}`);
      });
      
      console.log(`  └${'─'.repeat(borderWidth)}`);
      console.log(`  🔗 ${clickableUrl}`);
      console.log();
      separator();
      console.log();
    });

    process.exit(0);
  } catch (err) {
    console.error('Error fetching news:', err.message);
    process.exit(1);
  }
}

const args = process.argv.slice(2);

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
`);
  process.exit(0);
}

if (args[0] === '--version' || args[0] === '-v') {
  console.log(`sondakika v${version}`);
  process.exit(0);
}

const source = args[0];
const count = args[1] ? parseInt(args[1]) : 10;

fetchNews(source, count);