 const { app, BrowserWindow } = require('electron');
 let win;
 function createWindow() {
     win = new BrowserWindow({ width: 800, height: 600 });
     win.loadURL(`file://${__dirname}/index.html`);
 }
 app.on('ready', createWindow);