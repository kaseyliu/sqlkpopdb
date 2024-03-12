import express from "express"
import mysql from "mysql"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "he4dinthecl0uds",
    database:"kpop"
})

app.get("/", (req, res)=> {
    res.json("hello this is the backend for kpop db project!")
})

app.get("/companies", (req, res)=>{
    const q = "SELECT * FROM COMPANY"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800, ()=> {
    console.log("Connected to backend!")
})