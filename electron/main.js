const { app, BrowserWindow } = require("electron");
const path = require("path");

const iconPath = path.join(__dirname, "..", "build", "icon.ico");

function createWindow() {
  const win = new BrowserWindow({
    width: 960,
    height: 800,
    ...(process.platform === "win32" ? { icon: iconPath } : {}),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, "..", "index.html"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
