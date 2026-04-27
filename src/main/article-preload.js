const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('articleAPI', {
  // Get initial data (news array + current index) from main
  getArticleData: () => ipcRenderer.invoke('article-view-get-data'),

  // Notify main that the view window wants to close (return to modal)
  closeView: (currentIndex) => ipcRenderer.invoke('article-view-close', currentIndex),

  // Open the external URL in the system browser
  openExternal: (url) => ipcRenderer.invoke('open-external', url),

  // Listen for "navigate" events pushed from main (when left/right pressed and next news loaded)
  onNavigate: (callback) => ipcRenderer.on('article-view-navigate', (_event, data) => callback(data))
});
