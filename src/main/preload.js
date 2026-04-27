const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getSources: () => ipcRenderer.invoke('get-sources'),
  getState: () => ipcRenderer.invoke('get-state'),
  saveState: (state) => ipcRenderer.invoke('save-state', state),
  fetchNews: (enabledSources, sortOrder) => ipcRenderer.invoke('fetch-news', enabledSources, sortOrder)
});