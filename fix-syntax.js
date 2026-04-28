const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'renderer', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Fix all JavaScript syntax issues
const fixes = [
  // Fix 'news' variable name (should be 'news')
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
  
  // Fix 'returnedIndex' -> 'returnedIndex'
  [/returnedIndex/g, 'returnedIndex'],
  
  // Fix '.classList' typo
  [/\.classList/g, '.classList'],
  
  // Fix 'keydown' typo
  [/keydown/g, 'keydown'],
  
  // Fix 'nearest' typo
  [/'nearest'/g, "'nearest'"],
  
  // Fix Math.min syntax
  [/Math\.min\(28, newSize\)/g, 'Math.min(28, newSize)'],
  
  // Fix method calls with wrong quotes
  [/getElementById\('/g, 'getElementById('],
  [/textContent = '/g, "textContent = '"],
  [/';/g, "';"]
];

fixes.forEach(([pattern, replacement]) => {
  content = content.replace(pattern, replacement);
});

// Fix the forEach loops where 'news' should be 'news'
content = content.replace(/forEach\(function\(news/g, 'forEach(function(news');
content = content.replace(/forEach\(function\(news,/g, 'forEach(function(news,');

fs.writeFileSync(filePath, content, 'utf8');
console.log('All syntax errors fixed in index.html');
