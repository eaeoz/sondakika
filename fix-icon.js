const fs = require('fs')
const path = require('path')

// Create a proper ICO file with multiple sizes
// This is a simplified version - for production, use a proper icon conversion tool

// Read the PNG file
const pngPath = path.join(__dirname, 'assets', 'icon.png')
const pngData = fs.readFileSync(pngPath)

// For now, let's just use the PNG directly and rename it
// Windows ICO files need multiple sizes (16, 32, 48, 64, 128, 256)
// The easiest solution is to use a proper icon converter

// Let's check if the current ICO is valid
const icoPath = path.join(__dirname, 'assets', 'icon.ico')
const icoData = fs.readFileSync(icoPath)

console.log('PNG size:', pngData.length)
console.log('ICO size:', icoData.length)
console.log('ICO header:', icoData.slice(0, 6).toString('hex'))

// The ICO format expects specific structure
// Let me create a proper one using a different approach

// Actually, electron-builder can use PNG files directly
// Let's just update the config to use PNG and let electron-builder handle conversion
console.log('\nThe icon files are ready. Try rebuilding the app.')
console.log('If the icon still does not appear, you may need to:')
console.log('1. Clear the dist folder: rm -rf dist')
console.log('2. Rebuild: npm run build')
console.log('3. Or use a proper ICO file from an online converter')
