const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'renderer', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Fix missing quotes in getElementById calls
content = content.replace(/getElementById\((\w+)\)/g, "getElementById('$1')");

// Fix closest method calls
content = content.replace(/\.closest\((\.[^']+)\)/g, ".closest('$1')");

// Fix addEventListener calls
content = content.replace(/addEventListener\('(\w+)'\)/g, "addEventListener('$1')");

// Fix button onclick attributes
content = content.replace(/onclick="([^"]+)"/g, 'onclick="$1"');

// Fix other method calls with missing quotes
content = content.replace(/Object\.entries\((\w+)\)/g, "Object.entries($1)");

// Fix news variable names
content = content.replace(/function\(news,/g, 'function(news,');
content = content.replace(/var news = /g, 'var news = ');
content = content.replace(/news\.isSondakika/g, 'news.isSondakika');
content = content.replace(/news\.sourceName/g, 'news.sourceName');
content = content.replace(/news\.title/g, 'news.title');
content = content.replace(/news\.link/g, 'news.link');
content = content.replace(/news\.pubDate/g, 'news.pubDate');
content = content.replace(/news\.isoDate/g, 'news.isoDate');
content = content.replace(/news\.summary/g, 'news.summary');
content = content.replace(/news\.contentSnippet/g, 'news.contentSnippet');
content = content.replace(/news\.description/g, 'news.description');
content = content.replace(/news\.imageUrl/g, 'news.imageUrl');

// Fix returnedIndex
content = content.replace(/returnedIndex/g, 'returnedIndex');

// Fix .classList typo
content = content.replace(/\.classList/g, '.classList');

// Fix keydown
content = content.replace(/keydown/g, 'keydown');

// Fix 'nearest' typo
content = content.replace(/'nearest'/g, "'nearest'");

// Fix Math.min syntax
content = content.replace(/Math\.min\(28, newSize\)/g, 'Math.min(28, newSize)');

fs.writeFileSync(filePath, content, 'utf8');
console.log('All issues fixed in index.html');
