const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getSources:       ()                          => ipcRenderer.invoke('get-sources'),
  getState:         ()                          => ipcRenderer.invoke('get-state'),
  saveState:        (state)                     => ipcRenderer.invoke('save-state', state),
  fetchNews:        (enabledSources, sortOrder) => ipcRenderer.invoke('fetch-news', enabledSources, sortOrder),
  openExternal:     (url)                       => ipcRenderer.invoke('open-external', url),
  setFontSize:      (fontSize)                  => ipcRenderer.invoke('set-font-size', fontSize),
  setTheme:         (theme)                     => ipcRenderer.invoke('set-theme', theme),

  // Open the full-window article viewer
  openArticleView:  (newsItems, currentIndex)   => ipcRenderer.invoke('open-article-view', newsItems, currentIndex),

  // Listen for the viewer window closing — returns the index the user was on
  onArticleViewClosed: (callback) => ipcRenderer.on('article-view-closed', (_event, idx) => callback(idx))
});