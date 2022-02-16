const express = require("express")
const router = express.Router();
const db = require("../database/db.js")


//SELECT
router.get("/", (req,res) =>{
    let sql = "SELECT * FROM pacientes LIMIT 20"
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    })
})

router.get("/count", (req, res) => {
    let sql = "SELECT COUNT(*) FROM pacientes"
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        const result = Object.values(rows[0])
        res.send({result: result[0]})
    })
})

router.get("/page/:num", (req, res) => {
    let sql = `SELECT * FROM pacientes LIMIT 20 OFFSET ${req.params.num * 20}`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render("index", {arr: rows})
    })
})

router.get("/orderby/:param", (req, res) => {
    let sql = `SELECT * FROM pacientes ORDER BY ${req.params.param} ASC LIMIT 20`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    })
})


//SELECT * FROM pacientes WHERE
router.get("/obrasocial/:social", (req, res) => {
    const {social} = req.params
    const sql = `SELECT * FROM pacientes WHERE obrasocial = '${social}'`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    })
})

router.get("/nombre/:nombre", (req, res) => {
    const { nombre } = req.params
    const sql = `SELECT * FROM pacientes WHERE nombre = '${nombre}'`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    })
})

router.get("/apellido/:apellido", (req, res) => {
    const { apellido } = req.params
    const sql = `SELECT * FROM pacientes WHERE apellido = '${apellido}'`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    })
})

router.get("/carnet/:carnet", (req, res) => {
    const { carnet } = req.params
    const sql = `SELECT * FROM pacientes WHERE carnet = '${carnet}'`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    })
})

router.get("/dni/:dni", (req, res) => {
    const { dni } = req.params
    const sql = `SELECT * FROM pacientes WHERE dni = '${dni}'`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    })
})

//INSERT NEW ONE
router.post("/", (req, res) => {
    const data = Object.values(req.body);
    let placeholders = data.map((x) => '?').join(',');

    db.run(`INSERT INTO pacientes(${Object.keys(req.body)}) VALUES(${placeholders})` , data, function (err) {
        if (err) return console.error(err)
        else res.send({result: "paciente agregado"})
    })
})

router.delete("/deletebyid/:id", (req,res) => {
    const {id} = req.params;
    db.run(`DELETE FROM pacientes WHERE id = ${id}`, (err) =>{
        if(err) console.error(err);
        else res.send("Paciente eliminado exitosamente")
    })
})


module.exports = router;