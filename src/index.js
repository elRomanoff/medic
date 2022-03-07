const { app, BrowserWindow } = require("electron");
const db = require("./database/db");
const express = require("express")
const routes = require("./routes");
const cors = require("cors")

let win = null

function createWindow(){
    db.create()
    const server = express();

    server.use(cors())
    server.use(express.json())
    server.use(express.urlencoded({extended: true}))

    server.use("/", routes)

    win = new BrowserWindow({
        width: 900,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    win.loadFile("./src/index.html")

    server.listen(3000, () => {
        console.log("El servidor esta inicializado en el puerto 80");
    });
}

app.whenReady().then(() =>{
    createWindow();
})

module.exports = db