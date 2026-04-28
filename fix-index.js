const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'renderer', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Fix unicode escape sequences - replace with actual UTF-8 characters
const replacements = [
  ['\\uD83D\\uDCF0', '📰'],
  ['\\uD83D\\uDD04', '🔄'],
  ['\\uD83D\\uDCFD', '📭'],
  ['\\uD83D\\uDD52', '🕒'],
  ['\\uD83D\\uDD17', '🔗'],
  ['\\u2191', '↑'],
  ['\\u2193', '↓'],
  ['\\u2190', '←'],
  ['\\u2192', '→'],
  ['\\u00AB', '«'],
  ['\\u00BB', '»'],
  ['\\u2039', '‹'],
  ['\\u203A', '›'],
  ['\\u2022', '•'],
  ['\\u2713', '✓']
];

replacements.forEach(([esc, char]) => {
  content = content.split(esc).join(char);
});

// Fix .classList typo -> .classList
content = content.replace(/\.classList/g, '.classList');

// Fix variable name 'news' -> 'news' in forEach loops
content = content.replace(/function\(news,/g, 'function(news,');
content = content.replace(/var newsIndex/g, 'var newsIndex');
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

// Fix returnedIndex -> returnedIndex
content = content.replace(/returnedIndex/g, 'returnedIndex');

// Fix Math.min syntax: Math.min(28, newSize) not Math.min(28, newSize)
content = content.replace(/Math\.min\(28, newSize\)/g, 'Math.min(28, newSize)');

// Fix event.key typos
content = content.replace(/keydown/g, 'keydown');

// Fix block: 'nearest' -> 'nearest'
content = content.replace(/'nearest'/g, "'nearest'");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed all issues in index.html');
