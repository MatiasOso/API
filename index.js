const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

const connection = mysql.createConnection({
    host:'db4free.net',
    database:'djangodb4oso',
    user:'matioso',
    password:'Protonmail.cl', //1ncpssword

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

app.get('/clientes',(req,res)=>{
    const query = `SELECT * FROM djangodb4oso.clientes`
    connection.query(query,(error,resultado) => {
        if (error) return console.log(error.message)
        const obj={}
        if (resultado.length > 0){
            obj.listaclientes = resultado
            res.json(obj)
        }else{
            res.json('No hay clientes registrados')
        }
    })
});

app.get('/clientes/:id',(req,res)=>{
    const {id} = req.params

    const query = `SELECT * FROM djangodb4oso.clientes where id = ${id};`
    connection.query(query,(error,resultado) => {
        if (error) return console.log(error.message)
        
        if (resultado.length > 0){
            console.log('Cliente encontrado en el registro')
            res.json(resultado)
        }else{
            res.json('No se encuentra el cliente en el registro')
        }
    })
});

app.delete('/clientes/delete/:id',(req,res)=>{ //Esto no funciona :( se debe hacer mediando postman
    const {id} = req.params
    const query = `DELETE FROM djangodb4oso.clientes where id = ${id};`
    connection.query(query,(error) => {
        if (error) return console.log(error.message)
        res.json('Cliente eliminado correctamente')
    })
});



app.post('/clientes/add',(req,res)=>{
    const cliente = {
        // id: 7,
        usuario: req.body.usuario,
        clave: req.body.clave
    }

    const query = `INSERT INTO djangodb4oso.clientes(usuario,clave) values (?,?)`

    connection.query(query, [
        cliente.usuario,
        cliente.clave
    ], (error) => {
        if(error) return console.error(error.message)
        res.json('Cliente registrado correctamente')
    })
});
//  HASTA AQUI FUNCIONA FUNCIONA!!! 2-10-2023 16:45