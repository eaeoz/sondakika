# AGENTS.md - News CLI Project

## Project Overview

This is a simple Node.js CLI application that fetches and displays news from RSS feeds. It uses `rss-parser` to parse RSS feeds and displays news in a styled terminal output.

## Project Structure

```
haberler/
├── index.js          # Main CLI entry point
├── package.json      # Project dependencies and scripts
└── AGENTS.md         # This file - guidelines for AI agents
```

## Build & Run Commands

```bash
# Run the CLI
npm start            # Runs: node index.js
node index.js        # Direct execution

# With arguments
node index.js ntv              # Show NTV news (default 10 items)
node index.js ntv 15           # Show 15 NTV news items

# Global installation (for 'news' command)
npm link
news ntv 15   # Run as global command
```

## Adding New RSS Sources

To add a new news source, edit `index.js` and add to the `sources` object:

```javascript
const sources = {
  ntv: 'https://www.ntv.com.tr/son-dakika.rss',
  bbc: 'https://feeds.bbci.co.uk/news/rss.xml',
  cnn: 'http://rss.cnn.com/rss/edition.rss'
};
```

Then run with:
```bash
node index.js bbc
```

## No Test/Lint Commands

This project does not currently have:
- Unit tests
- Linting configuration
- TypeScript
- CI/CD pipelines

If you add tests, use:
```bash
npm test              # Run tests
npm run lint         # Run ESLint (if configured)
```

## Code Style Guidelines

### General Principles
- Keep the codebase simple and minimal
- Use vanilla JavaScript (no TypeScript for this project)
- Avoid unnecessary dependencies
- Focus on readability and maintainability

### File Structure
- `index.js` - Main entry point (single file application)
- `package.json` - Project configuration

### Naming Conventions
- **Variables/Functions**: camelCase (e.g., `fetchNews`, `wrapText`)
- **Constants**: UPPER_SNAKE_CASE if truly constant (e.g., `MAX_WIDTH`)
- **Files**: lowercase with hyphens (kebab-case)

### Code Style
- Use **2 spaces** for indentation
- **No semicolons** at end of statements (optional, but consistent with project)
- Use template literals (backticks) for string interpolation
- Use arrow functions for callbacks
- Prefer `const` over `let`, avoid `var`

### Imports
```javascript
// Direct require for Node built-ins
const path = require('path');

// Third-party packages
const Parser = require('rss-parser');
```

### Functions
- Keep functions small and focused
- Use descriptive names
- Add JSDoc comments for exported functions

```javascript
/**
 * Wraps text to specified width for terminal display
 * @param {string} text - Text to wrap
 * @param {number} width - Maximum line width
 * @returns {string[]} Array of wrapped lines
 */
function wrapText(text, width = 68) { ... }
```

### Error Handling
- Use try-catch for async operations
- Display user-friendly error messages
- Exit with non-zero code on errors: `process.exit(1)`

```javascript
try {
  const feed = await parser.parseURL(url);
} catch (err) {
  console.error('Error fetching news:', err.message);
  process.exit(1);
}
```

### CLI Output
- Use Unicode characters for borders (┌─┐│└┘)
- Support clickable URLs via ANSI escape codes (iTerm2/Windows Terminal)
- Wrap long text to fit terminal width (default: 68 chars)
- Add emoji for visual appeal (📰, 🔗)
- Add separator lines between news items for clarity

### Dependencies
- Keep dependencies minimal
- Use well-maintained packages:
  - `rss-parser` - RSS feed parsing
  - `cli-table3` - Table formatting (if needed)

## Dependencies

Current dependencies (from package.json):
```json
{
  "rss-parser": "^3.13.0",
  "cli-table3": "^0.6.5"
}
```

## Future Improvements (for agents)

If adding features, consider:
1. Adding unit tests with Jest or Mocha
2. Adding ESLint for code quality
3. Supporting multiple RSS sources beyond NTV
4. Adding configuration file for sources
5. Adding caching to reduce network calls
6. Adding date/time formatting for news items
7. Adding color output for different news categories
8. Adding pagination for large result sets