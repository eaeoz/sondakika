const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'renderer', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Fix all JavaScript variable name issues
const fixes = [
  [/function\(news,/g, 'function(news,'],
  [/var newsIndex/g, 'var newsIndex'],
  [/news\.isSondakika/g, 'news.isSondakika'],
  [/news\.sourceName/g, 'news.sourceName'],
  [/news\.title/g, 'news.title'],
  [/news\.link/g, 'news.link'],
  [/news\.pubDate/g, 'news.pubDate'],
  [/news\.isoDate/g, 'news.isoDate'],
  [/news\.summary/g, 'news.summary'],
  [/news\.contentSnippet/g, 'news.contentSnippet'],
  [/news\.description/g, 'news.description'],
  [/news\.imageUrl/g, 'news.imageUrl'],
  [/returnedIndex/g, 'returnedIndex'],
  [/\.classList/g, '.classList'],
  [/keydown/g, 'keydown'],
  [/'nearest'/g, "'nearest'"],
  [/Math\.min\(28, newSize\)/g, 'Math.min(28, newSize)']
];

fixes.forEach(([pattern, replacement]) => {
  content = content.replace(pattern, replacement);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('All JavaScript syntax errors fixed in index.html');
