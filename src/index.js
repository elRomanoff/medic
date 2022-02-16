const { app, BrowserWindow } = require("electron");
const db = require("./database/db");
const express = require("express")
const routes = require("./routes");

let win = null

function createWindow(){
    db.create()
    const server = express();

    server.use(express.json())
    server.use(express.urlencoded({extended: true}))

    server.use("/", routes)

    win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    win.loadFile("./src/index.html")

    server.listen(3000, () => {
        console.log("El servidor esta inicializado en el puerto 3000");
    });
}

app.whenReady().then(() =>{
    createWindow();
})

module.exports = db