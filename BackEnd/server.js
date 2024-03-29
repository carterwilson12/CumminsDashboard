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
    const sql = "SELECT WIP_JOB_NUMBER, WIP_JOB_QTY FROM mes_wip_info";
    db.query(sql, (err, data)=> {
        if(err) {
            return res.json(err)
        }
        return res.json(data);
    })
})

app.get("/wip/:id", (req,res)=>{
    const id = req.params.id;
    db.query("SELECT * FROM mes_wip_info WHERE WIP_JOB_NUMBER = ?", id, 
    (err,result)=>{
        if(err) {
        console.log(err)
        } 
        res.send(result)
        });   
    });

app.get("/tsn/:id", (req,res)=>{
    const id = req.params.id;
    db.query("SELECT * FROM mes_assy_job_info WHERE WIP_JOB_NUMBER = ?", id, 
    (err,result)=>{
        if(err) {
        console.log(err)
        } 
        res.send(result)
        });   
    });

app.get("/bom/:id", (req,res)=>{
    const id = req.params.id;

    db.query("SELECT * FROM mes_bom_components WHERE WIP_JOB_NUMBER = ? AND PICK_FLAG ='Y'", id, 
    (err,result)=>{
        if(err) {
        console.log(err)
        } 
        res.send(result)
        });   
    });

    app.get("/tsn_rej/:id", (req,res)=>{
        const id = req.params.id;
    
        db.query(`SELECT * FROM mes_scrap_info WHERE TRANSACTION_REFERENCE LIKE %${id}%`, id, 
        (err,result)=>{
            if(err) {
            console.log(err)
            } 
            res.send(result)
            });   
        });

app.listen(8081, ()=>{
    console.log("Running");
})