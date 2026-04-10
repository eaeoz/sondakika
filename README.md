# Sondakika

Terminal-based CLI tool to fetch and display breaking news from RSS feeds.

![sondakika](https://img.shields.io/badge/sondakika-news%20CLI-blue)
![Node.js](https://img.shields.io/badge/Node.js-14%2B-green)
![License](https://img.shields.io/badge/License-ISC-yellow)

## Features

- 📰 Fetch news from multiple Turkish news sources
- 🔗 Clickable URLs in terminal (iTerm2, Windows Terminal, macOS Terminal)
- 🎨 Styled terminal output with Unicode borders
- ⚡ Fast and lightweight

## Installation

### Using npx (no install)

```bash
npx sondakika ntv
```

### Global install

```bash
npm install -g sondakika
```

## Usage

```bash
# Show NTV news (default 10 items)
sondakika ntv

# Show 15 NTV news items
sondakika ntv 15

# Show Cumhuriyet news
sondakika cumhuriyet

# Show Cumhuriyet news with custom count
sondakika cumhuriyet 20

# Show TRT Haber news
sondakika trt

# Show TRT Haber news with custom count
sondakika trt 15

# Show Mynet news
sondakika mynet

# Show Mynet news with custom count
sondakika mynet 15
```

### Available Sources

| Command | Source |
|---------|--------|
| `ntv` | NTV Son Dakika |
| `cumhuriyet` | Cumhuriyet |
| `trt` | TRT Haber |
| `mynet` | Mynet |

### Help

```bash
sondakika
# or
sondakika --help
```

## Output Example

```
📰 ══════════════════════════════════════════════════
   Latest 10 News from NTV
   ══════════════════════════════════════════════════

  ┌─ 1. Son dakika deprem mi oldu?
  │
  │   📅 10.04.2026 20:02
  │
  │   Son depremler... 
  └─────────────────────────────────────────────────────────────────────
  🔗 https://www.ntv.com.tr/...
```

## Development

```bash
# Clone and install
npm install

# Run locally
npm start

# Link for global testing
npm link
```

## License

ISC

## Author

Sedat ERGOZ
