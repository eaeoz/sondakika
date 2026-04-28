const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getSources: () => ipcRenderer.invoke('get-sources'),
  getState: () => ipcRenderer.invoke('get-state'),
  saveState: (state) => ipcRenderer.invoke('save-state', state),
  setFontSize: (size) => ipcRenderer.invoke('set-font-size', size),
  setTheme: (theme) => ipcRenderer.invoke('set-theme', theme),
  fetchNews: (sources, order) => ipcRenderer.invoke('fetch-news', sources, order),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  openArticleView: (items, index) => ipcRenderer.invoke('open-article-view', items, index),
  onArticleViewClosed: (callback) => {
    ipcRenderer.on('article-view-closed', (event, index) => callback(index))
  }
})
