const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'capstone'
})

app.get('/', (re, res)=> {
    return res.json("response for GET request");
})

app.get('/wips', (req, res)=> {
    const sql = "SELECT * FROM mes_wip_info";
    db.query(sql, (err, data)=> {
        if(err) {
            return res.json(err)
        }
        return res.json(data);
    })
})

app.get('/tsn', (req, res)=> {
    const sql = "SELECT * FROM mes_assy_job_info";
    db.query(sql, (err, data)=> {
        if(err) {
            return res.json(err)
        }
        return res.json(data);
    })
})

app.get("/tsn_id/:id", (req,res)=>{

    const id = req.params.id;
     db.query("SELECT * FROM posts WHERE id = ?", id, 
     (err,result)=>{
        if(err) {
        console.log(err)
        } 
        res.send(result)
        });   });

app.listen(8081, ()=>{
    console.log("Running");
})