const sqlite3 = require('sqlite3').verbose();

// open database
let db = new sqlite3.Database(__dirname + "/database.sqlite", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to SQlite database.');
});

//CREAR BASE DE DATOS
db.create = ()=>{
    db.run("CREATE TABLE IF NOT EXISTS pacientes(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT,apellido TEXT,dni INT,obrasocial TEXT,carnet TEXT,diagnostico TEXT,antecedentes TEXT, tratamiento TEXT)", (err)=>{
        if (err){
            console.log(err + " cagaste")
        }
    })
    db.run("CREATE TABLE IF NOT EXISTS obrassociales(nombre)",(err) =>{
        if (err){
            console.log(err)
        }
    })
}

module.exports = db