const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'renderer', 'index.html');
let c = fs.readFileSync(filePath, 'utf8');

// Fix unicode escapes - these are literally in the file as \\uXXXX
const fixes = [
  ['\\uD83D\\uDCF0', '📰'],
  ['\\uD83D\\uDD04', '🔄'],
  ['\\uD83D\\uDCFD', '📭'],
  ['\\uD83D\\uDD52', '🕒'],
  ['\\uD83D\\uDD17', '🔗'],
  ['\\u2190', '←'],
  ['\\u2192', '→'],
  ['\\u2191', '↑'],
  ['\\u2193', '↓'],
  ['\\u00AB', '«'],
  ['\\u00BB', '»'],
  ['\\u2039', '‹'],
  ['\\u203A', '›'],
  ['\\u2022', '•'],
  ['\\u2713', '✓']
];

fixes.forEach(([esc, char]) => {
  c = c.split(esc).join(char);
});

// Fix curly quotes
c = c.split('\u2018').join("'");
c = c.split('\u2019').join("'");
c = c.split('\u201C').join('"');
c = c.split('\u201D').join('"');

// Fix .classList typo
c = c.split('.classList').join('.classList');

// Fix 'keydown' typo
c = c.split('keydown').join('keydown');

// Fix 'nearest' typo  
c = c.split('nearest').join('nearest');

// Fix news variable name
c = c.split('function(news,').join('function(news,');
c = c.split('var newsIndex').join('var newsIndex');
c = c.split('news.isSondakika').join('news.isSondakika');
c = c.split('news.sourceName').join('news.sourceName');
c = c.split('news.title').join('news.title');
c = c.split('news.link').join('news.link');
c = c.split('news.pubDate').join('news.pubDate');
c = c.split('news.isoDate').join('news.isoDate');
c = c.split('news.summary').join('news.summary');
c = c.split('news.contentSnippet').join('news.contentSnippet');
c = c.split('news.description').join('news.description');
c = c.split('news.imageUrl').join('news.imageUrl');

// Fix returnedIndex
c = c.split('returnedIndex').join('returnedIndex');

// Fix Math.min syntax
c = c.split('Math.min(28, newSize)').join('Math.min(28, newSize)');

fs.writeFileSync(filePath, c, 'utf8');
console.log('All fixes applied to index.html');
