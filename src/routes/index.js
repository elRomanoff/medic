const express = require("express")
const router = express.Router();
const db = require("../database/db.js")


//SELECT
router.get("/", (req,res) =>{
    let sql = "SELECT * FROM pacientes LIMIT 10 OFFSET 0"
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    })
})
router.get("/count", (req, res) =>{
    db.all("SELECT COUNT(*) FROM pacientes", [], (err, rows) =>{
        if(err) console.error(err)
        res.send(Object.values(rows[0]))
    })
})

//ORDER BY
router.get("/orden/:campo", (req, res) => {
    const sql = `SELECT * FROM pacientes ORDER BY ${req.params.campo} DESC LIMIT 10`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    })
})
router.get("/orden/:campo/count",(req,res) =>{
    db.all("SELECT COUNT(*) FROM pacientes", [], (err, rows) => {
        if (err) console.error(err)
        res.send(Object.values(rows[0]))
    })
})

//SELECT * FROM pacientes WHERE
router.get("/campos/:campo/:valor", (req, res) => {
    if(req.params.valor === "count"){
        const sql = `SELECT COUNT(*) FROM pacientes`
        db.all(sql, [], (err, rows) =>{
            if(err) console.error(err);
            else res.send(Object.values(rows[0]))
        })
    }
    else{
        const sql = `SELECT * FROM pacientes WHERE ${req.params.campo} LIKE '%${req.params.valor}%' ORDER BY ${req.params.campo} LIMIT 10` 
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows)
        })
    }
})

router.get("/campos/:campo/:valor/count", (req, res) => {
    const sql = `SELECT COUNT(*) FROM pacientes WHERE ${req.params.campo} LIKE '%${req.params.valor}%' LIMIT 10 ORDER BY ${req.params.campo}` 
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(Object.values(rows[0]))
    })
})


//page number
router.get("/page/:num", (req, res) => {
    let sql = `SELECT * FROM pacientes LIMIT 10 OFFSET ${(req.params.num -1) * 10}`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    })
})

router.get("/orden/:campo/page/:num", (req, res) => {
    let sql = `SELECT * FROM pacientes ORDER BY ${req.params.campo} LIMIT 10 OFFSET ${(req.params.num - 1) * 10}`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    })
})

router.get("/campos/:campo/:value/page/:num", (req, res) => {
    let sql = `SELECT * FROM pacientes LIMIT 10 OFFSET ${(req.params.num -1) * 10} WHERE ${campo} LIKE '%${req.params.value}%'`
    db.all(sql,[], (err, rows) =>{
        if(err) {
            throw err;
        }
        res.send(rows)
    })
})




//INSERT NEW ONE
router.post("/", (req, res) => {
    const body = Object.values(req.body);
    data = body.map(x => x.toLowerCase())
    let placeholders = data.map((x) => '?').join(',');

    db.run(`INSERT INTO pacientes(${Object.keys(req.body)}) VALUES(${placeholders})` , data, function (err) {
        if (err) return console.error(err)
        else res.send({result: "paciente agregado"})
    })
})

//UPDATE

router.put("/:id", (req, res) => {
    const id = req.params.id
    const body = req.body;
    let data = body.map(x =>{
        return x.toLowerCase()
    })

    db.run(`UPDATE pacientes SET nombre = '${data[0]}', apellido = '${data[1]}', dni = '${data[2]}', obrasocial = '${data[3]}', carnet = '${data[4]}', diagnostico = '${data[5]}', antecedentes = '${data[6]}', tratamiento = '${data[7]}' WHERE id = '${id}'`, [], function(err) {
        if (err) console.error(err, data)
        else res.send({result: data})
    })

})

//DELETE 
router.delete("/deletebyid/:id", (req,res) => {
    const {id} = req.params;
    db.run(`DELETE FROM pacientes WHERE id = ${id}`, (err) =>{
        if(err) console.error(err);
        else res.send("Paciente eliminado exitosamente")
    })
})


//TABLA DE OBRAS SOCIALES

router.post("/obrassociales/:data",(req,res) =>{
    const data = req.params.data;
    db.run(`INSERT INTO obrassociales(nombre) VALUES (?)`, [data], function (err) {
        if (err) return console.error(err)
        else res.send({ result: "obra social agregada" })
    })
})

router.get("/get/obrassociales",(req,res) =>{
    const sql = `SELECT * FROM obrassociales`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    })
})

module.exports = router;