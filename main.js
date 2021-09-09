// Modules to control application life and create native browser window
const {JsonDB} = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const {app, BrowserWindow} = require('electron')
const os = require('os');
const path = require('path')

var db = new JsonDB(new Config("DB_"+os.userInfo().username, true, false, '/'));

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


//DB Controller

function addFolder(fPath, tbName) {
  var json = {};
  json[tbName] = {
      fPath: fPath
  }
  console.log(json)
  db.push("/folders",json, false);
}
function removeFolder(tbName) {
  db.delete("/folders/"+tbName);
}