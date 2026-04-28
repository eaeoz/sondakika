#!/usr/bin/env node

const RssParser = require('rss-parser');
const parser = new RssParser({
  timeout: 10000,
  requestOptions: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  }
});

async function testCumhuriyet() {
  try {
    console.log('Testing Cumhuriyet RSS feed...');
    const feed = await parser.parseURL('https://www.cumhuriyet.com.tr/rss/son_dakika.xml');
    console.log('Feed title:', feed.title);
    console.log('Total items:', feed.items.length);
    if (feed.items.length > 0) {
      console.log('First item title:', feed.items[0].title);
      console.log('First item date:', feed.items[0].pubDate);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testCumhuriyet();
