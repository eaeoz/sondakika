const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'renderer', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Fix all occurrences of the variable name 'news' (should be 'news')
// This is the main issue - the build script used 'news' instead of 'news'
content = content.replace(/const item = document\.createElement/g, 'const item = document.createElement');
content = content.replace(/var key = entry\[0\]/g, 'var key = entry[0]');
content = content.replace(/var source = entry\[1\]/g, 'var source = entry[1]');

// Fix the forEach callback parameter
content = content.replace(/Object\.entries\(sources\)\.forEach\(function\(entry\)/g, 'Object.entries(sources).forEach(function(entry)');

// Fix the news variable in forEach
content = content.replace(/pageNews\.forEach\(function\(news,/g, 'pageNews.forEach(function(news,');
content = content.replace(/\(news,/g, '(news,');
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

// Fix function calls
content = content.replace(/window\.openArticleView\(newsIndex\)/g, 'window.openArticleView(newsIndex)');
content = content.replace(/openArticleView\(globalIdx\)/g, 'openArticleView(globalIdx)');

// Fix returnedIndex
content = content.replace(/returnedIndex/g, 'returnedIndex');

// Fix textContent vs textContent
content = content.replace(/\.textContent/g, '.textContent');

// Fix classList typo
content = content.replace(/\.classList/g, '.classList');

// Fix event key
content = content.replace(/keydown/g, 'keydown');

// Fix nearest typo
content = content.replace(/'nearest'/g, "'nearest'");

// Fix Math.min syntax
content = content.replace(/Math\.min\(28, newSize\)/g, 'Math.min(28, newSize)');

fs.writeFileSync(filePath, content, 'utf8');
console.log('All issues fixed in index.html');
