#!/usr/bin/env node

const Parser = require('rss-parser');

const sources = {
  ntv: 'https://www.ntv.com.tr/son-dakika.rss',
  cumhuriyet: 'http://www.cumhuriyet.com.tr/rss/son_dakika.xml',
  trt: 'https://www.trthaber.com/sondakika.rss',
  mynet: 'https://www.mynet.com/haber/rss/sondakika'
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
    
    console.log('\n📰 ' + '═'.repeat(50));
    console.log(`   Latest ${items.length} News from ${source.toUpperCase()}`);
    console.log('   ' + '═'.repeat(50) + '\n');
    
    items.forEach((item, index) => {
      const title = item.title;
      const summary = item.summary || item.contentSnippet || '';
      const link = item.link;
      
      const titleLines = wrapText(title, 68);
      const summaryLines = wrapText(summary, 68);
      
      const maxWidth = Math.max(
        ...titleLines.map(l => l.length),
        ...summaryLines.map(l => l.length),
        3
      );
      
      const borderWidth = Math.min(maxWidth + 1, 70);
      const clickableUrl = `\u001b]8;;${link}\u0007${link}\u001b]8;;\u0007`;
      
      console.log(`  ┌─ ${index + 1}. ${titleLines[0]}`);
      titleLines.slice(1).forEach(line => {
        console.log(`  │   ${line}`);
      });
      console.log(`  │`);
      
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

if (args.length === 0) {
  console.log('Usage: sondakika <source> [count]');
  console.log(`Available sources: ${Object.keys(sources).join(', ')}`);
  console.log('Example: sondakika ntv 15');
  process.exit(1);
}

const source = args[0];
const count = args[1] ? parseInt(args[1]) : 10;

fetchNews(source, count);