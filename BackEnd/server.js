const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: 'admin',
    password: '@Apples@1997',
    database: 'intune'
})

app.get('/', (re, res)=> {
    return res.json("from Backend Side");
})

app.get('/users', (req, res)=> {
    const sql = "SELECT * FROM mdm_devices";
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, ()=>{
    console.log("listening");
})