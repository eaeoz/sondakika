const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getData: () => ipcRenderer.invoke('article-view-get-data'),
  navigate: (callback) => {
    ipcRenderer.on('article-view-navigate', (event, data) => callback(data))
  },
  close: (currentIndex) => ipcRenderer.invoke('article-view-close', currentIndex),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  setTitleFontSize: (size) => ipcRenderer.invoke('set-title-font-size', size),
  setContentFontSize: (size) => ipcRenderer.invoke('set-content-font-size', size),
  setTheme: (theme) => ipcRenderer.invoke('set-theme', theme),
  onThemeChanged: (callback) => {
    ipcRenderer.on('theme-changed', (event, theme) => callback(theme))
  },
  setSpeechEnabled: (enabled) => ipcRenderer.invoke('set-speech-enabled', enabled)
})
