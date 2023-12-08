const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cli = require('nodemon/lib/cli');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();

app.use(bodyParser.json());

const PORT = 80;

const connection = mysql.createConnection({
    host:'db4free.net',
    database:'dbosomens',
    user:'osomens',
    password:'CK1LU$.FM',
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

connection.connect(error => {
    if(error) throw error
    console.log('Connection to database successful');
});
app.get('/',(req,res) =>{
    res.send('API esta operativo (Y)')
});

app.get('/user',(req,res)=>{
    const query = `SELECT * FROM dbosomens.LoginTest`
    connection.query(query,(error,resultado) => {
        if (error) return console.log(error.message)
        const obj={}
        if (resultado.length > 0){
            obj.listaUsuarios = resultado
            res.json(obj)
        }else{
            res.json('No hay Usuarios registrados')
        }
    })
});

app.get('/hora', (req, res) => {
    const query = `SELECT * FROM dbosomens.Horario`;
    connection.query(query, (error, resultado) => {
        if (error) return console.log(error.message);
        const obj = {};
        if (resultado.length > 0) {
            obj.listaHorarios = resultado;
            res.json(obj);
        } else {
            res.json('No hay Horarios registrados');
        }
    });
});


