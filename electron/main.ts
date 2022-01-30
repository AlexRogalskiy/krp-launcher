import {app, BrowserWindow, ipcMain} from 'electron'
import UpdateManager from './Update.manager'
import {ping} from "minecraft-server-ping";

export let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function initStuff() {
  // TODO: check local file status
  console.log('AppData:', UpdateManager.getMinecraftPath())
  await UpdateManager.makeUpdate()
}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', async (evt, message) => {
    const msg = JSON.parse(message)
    if (msg.type == 'ping') {
      const data = await ping('91.243.57.252', 25565)
      // ipcMain.send("online", )
      evt.reply('online', {
        max: data.players.max,
        online: data.players.online,
      })
    } else if (msg.type == 'reinstall') {
      await UpdateManager.cleanInstall()
    }
  })
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .then(initStuff)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
