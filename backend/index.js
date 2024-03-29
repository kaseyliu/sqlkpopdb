import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "he4dinthecl0uds",
    database:"kpop"
})

// allows us to use client to send json file
app.use(express.json())
app.use(cors())

// GET endpoints
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

app.get("/kgroups", (req, res)=>{
    const q = "SELECT * FROM KGROUP"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.get("/artists", (req, res)=>{
    const q = "SELECT * FROM ARTIST a LEFT JOIN KGROUP g ON g.G_ID=a.A_GROUPID"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/songs", (req, res)=>{
    const q = "SELECT * FROM SONG s LEFT JOIN ALBUM a ON s.ALBUM_ID=a.ALBUM_ID;"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/albums", (req, res)=>{
    const q = "SELECT * FROM ALBUM;"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/tours", (req, res)=>{
    const q = "SELECT * FROM TOUR t LEFT JOIN ALBUM a ON t.ALBUM_ID=a.ALBUM_ID LEFT JOIN KGROUP r ON r.G_ID=t.GROUP_ID;"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/concerts", (req, res)=>{
    const q = "SELECT * FROM CONCERT c JOIN TOUR t ON c.TOUR_NAME=t.TOUR_NAME LEFT JOIN KGROUP r ON r.G_ID=t.GROUP_ID;"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/awards", (req, res)=>{
    const q = "SELECT * FROM AWARD a JOIN KGROUP g ON g.G_ID=a.WINNER_ID;"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})



// POST endpoints
app.post("/companies", (req, res)=> {
    const q = "INSERT INTO COMPANY (`COMPANY_NAME`, `START_YEAR`, `CEO_FNAME`, `CEO_LNAME`) VALUES (?) "
    // const values = [
    //     "name from backend", 
    //     1234, 
    //     "lname from backend", 
    //     "fname from backend"]
    const valuesclient = [
        req.body.company_name,
        req.body.start_year,
        req.body.ceo_lname,
        req.body.ceo_fname,
    ];
        db.query(q, [valuesclient], (err, data)=>{
            if(err) return res.json(err)
            return res.json("company created successfully")
        })

})

app.post("/groups", (req, res)=> {
    const q = "INSERT INTO KGROUP (`G_NAME`, `G_GEN`, `G_COMPANY`, `G_DEBUT`) VALUES (?) "
    const values = [
        req.body.name,
        req.body.generation,
        req.body.company,
        req.body.debut,
    ];
        db.query(q, [values], (err, data)=>{
            if(err) return res.json(err)
            return res.json("group created successfully")
        })

})

app.listen(8800, ()=> {
    console.log("Connected to backend!")
})