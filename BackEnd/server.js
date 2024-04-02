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

app.get('/search', (req, res) => {
  const { query, type, line, date} = req.query;

  let sqlQuery = '';
  let queryParams = [];
  let conditions = [];
  if (type === 'wip') {
    sqlQuery = 'SELECT * FROM mes_wip_info WHERE ';
    if (query) {
        conditions.push('WIP_JOB_NUMBER LIKE ?');
        queryParams.push(`%${query}%`);
      }
  } else if(type === 'tsn'){
    sqlQuery = 'SELECT DISTINCT WIP_JOB_NUMBER FROM mes_assy_job_info WHERE ';
    if (query) {
        conditions.push('PRD_SERIAL_NUMBER LIKE ?');
        queryParams.push(`%${query}%`);
      }
  }
  else if(type === 'ID21'){
    sqlQuery = 'SELECT * FROM mes_wip_info WHERE ';
    if (query) {
        conditions.push('ID21_ITEM_NUMBER LIKE ?');
        queryParams.push(`%${query}%`);
      }

  }

  if (line) {
    conditions.push('ASSEMBLY_LINE = ?');
    queryParams.push(line);
  }
  if (date) {
    let dateCondition = '';
    switch (date) {
      case '24hrs':
        dateCondition = 'LAST_UPDATE_DATE >= NOW() - INTERVAL 1 DAY';
        console.log("24hrs")
        break;
      case '7days':
        dateCondition = 'LAST_UPDATE_DATE >= NOW() - INTERVAL 7 DAY';
        console.log("7 days")

        break;
      case '15days':
        dateCondition = 'LAST_UPDATE_DATE >= NOW() - INTERVAL 15 DAY';
        console.log("15 days")

        break;
      case '30days':
        dateCondition = 'LAST_UPDATE_DATE >= NOW() - INTERVAL 30 DAY';
        console.log("30 days")

        break;
    }
    if (dateCondition) conditions.push(dateCondition);
  }

  if (type === '') {
    if (type === 'wip' || type === 'ID21') {
        sqlQuery = 'SELECT * FROM mes_wip_info';
      } else if(type === 'tsn') {
        sqlQuery = 'SELECT DISTINCT WIP_JOB_NUMBER FROM mes_assy_job_info';
      }
      else{
        result = ['blank']
        return res.send(result)
      }
  }

  sqlQuery += conditions.join(' AND ');

    db.query(sqlQuery, queryParams,    
        (err,result)=>{
        if(err) {
        console.log(err)
        } 
        res.send(result)
    });   
});

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