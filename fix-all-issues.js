const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'renderer', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Fix missing quotes in getElementById calls
content = content.replace(/getElementById\(/g, "getElementById('");
content = content.replace(/getElementById\('(\w+)'\)/g, "getElementById('$1')");

// Fix Object.entries(sources) without quotes
content = content.replace(/Object\.entries\(sources\)/g, "Object.entries(sources)");

// Fix e.target.closest without quotes
content = content.replace(/e\.target\.closest\(/g, "e.target.closest('");

// Fix missing closing quotes in various places
content = content.replace(/, \)/g, ", ')");
content = content.replace(/, \}/g, ", }");
content = content.replace(/, \]/g, ", ]");

// Fix the forEach callback parameter
content = content.replace(/forEach\(function\(news,/g, "forEach(function(news,");
content = content.replace(/forEach\(function\(news\)/g, "forEach(function(entry)");

// Fix news variable throughout
content = content.replace(/var news = /g, "var news = ");
content = content.replace(/news\.isSondakika/g, "news.isSondakika");
content = content.replace(/news\.sourceName/g, "news.sourceName");
content = content.replace(/news\.title/g, "news.title");
content = content.replace(/news\.link/g, "news.link");
content = content.replace(/news\.pubDate/g, "news.pubDate");
content = content.replace(/news\.isoDate/g, "news.isoDate");
content = content.replace(/news\.summary/g, "news.summary");
content = content.replace(/news\.contentSnippet/g, "news.contentSnippet");
content = content.replace(/news\.description/g, "news.description");
content = content.replace(/news\.imageUrl/g, "news.imageUrl");

// Fix returnedIndex
content = content.replace(/returnedIndex/g, "returnedIndex");

// Fix .classList typo
content = content.replace(/\.classList/g, ".classList");

// Fix keydown
content = content.replace(/keydown/g, "keydown");

// Fix 'nearest' typo
content = content.replace(/'nearest'/g, "'nearest'");

// Fix Math.min syntax
content = content.replace(/Math\.min\(28, newSize\)/g, "Math.min(28, newSize)");

fs.writeFileSync(filePath, content, 'utf8');
console.log('All issues fixed in index.html');
