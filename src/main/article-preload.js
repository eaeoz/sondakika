const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getData: () => ipcRenderer.invoke('article-view-get-data'),
  navigate: (callback) => {
    ipcRenderer.on('article-view-navigate', (event, data) => callback(data))
  },
  close: (currentIndex) => ipcRenderer.invoke('article-view-close', currentIndex),
  openExternal: (url) => ipcRenderer.invoke('open-external', url)
})
