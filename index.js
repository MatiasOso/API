const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cli = require('nodemon/lib/cli');
const req = require('express/lib/request');
const res = require('express/lib/response');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

const connection = mysql.createConnection({
    host:'db4free.net',
    database:'djangodb4oso',
    user:'matioso',
    password:'Protonmail.cl',
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





// RECETAS DE DON OSO RECETAS DE DON OSO RECETAS DE DON OSO RECETAS DE DON OSO RECETAS DE DON OSO
// RECETAS DE DON OSO RECETAS DE DON OSO RECETAS DE DON OSO RECETAS DE DON OSO RECETAS DE DON OSO
// RECETAS DE DON OSO RECETAS DE DON OSO RECETAS DE DON OSO RECETAS DE DON OSO RECETAS DE DON OSO
// RECETAS DE DON OSO RECETAS DE DON OSO RECETAS DE DON OSO RECETAS DE DON OSO RECETAS DE DON OSO
// RECETAS DE DON OSO RECETAS DE DON OSO RECETAS DE DON OSO RECETAS DE DON OSO RECETAS DE DON OSO

// Primer paso, ver si puedo mostrar los resultados de los usuarios registrados en la DB


// Usuarios
// Usuarios
// Usuarios
// Usuarios
// Usuarios
app.get('/usuarios',(req,res)=>{
    const query = `SELECT * FROM djangodb4oso.Usuario`
    connection.query(query,(error,resultado) => {
        if (error) return console.log(error.message)
        const obj={}
        if (resultado.length > 0){
            obj.listaclientes = resultado
            res.json(obj)
        }else{
            res.json('No hay usuarios registrados')
        }
    })
});

app.post('/usuarios/add', (req, res) => {
    const usuario = {
        Nombre: req.body.Nombre,
        Password: req.body.Password,
        Email: req.body.Email
    }

    const query = `INSERT INTO djangodb4oso.Usuario(Nombre, Password, Email) VALUES (?, ?, ?)`;

    connection.query(query, [
        usuario.Nombre,
        usuario.Password,
        usuario.Email
    ], (error, results, fields) => {
        if (error) {
            console.error('Error al insertar usuario:', error);
            res.status(500).json('Error al registrar usuario');
        } else {
            console.log('Query:', query);
            console.log('Usuario registrado correctamente');
            res.json('Usuario registrado correctamente');
        }
    });
});


app.delete('/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM djangodb4oso.Usuario WHERE ID = ?';

    connection.query(query, [userId], (error, resultado) => {
        if (error) {
            res.status(500).json({ message: "Error al eliminar el usuario" });
        } else {
            if (resultado.affectedRows > 0) {
                res.json({ message: "Usuario eliminado correctamente" });
            } else {
                res.status(404).json({ message: "Usuario no encontrado" });
            }
        }
    });
});

app.put('/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    const { Nombre, Password, Email } = req.body;
    const query = 'UPDATE djangodb4oso.Usuario SET Nombre = ?, Password = ?, Email = ? WHERE ID = ?';

    connection.query(query, [Nombre, Password, Email, userId], (error, resultado) => {
        if (error) {
            res.status(500).json({ message: "Error al editar el usuario" });
        } else {
            if (resultado.affectedRows > 0) {
                res.json({ message: "Usuario editado correctamente" });
            } else {
                res.status(404).json({ message: "Usuario no encontrado" });
            }
        }
    });
});








app.get('/recetas',(req,res)=>{
    const query = `SELECT * FROM djangodb4oso.Receta`
    connection.query(query,(error,resultado) => {
        if (error) return console.log(error.message)
        const obj={}
        if (resultado.length > 0){
            obj.listarecetas = resultado
            res.json(obj)
        }else{
            res.json('No hay recetas detectadas')
        }
    })
});

// imagenes
app.get('/imagenes',(req,res)=>{
    const query = `SELECT * FROM djangodb4oso.url_imgs`
    connection.query(query,(error,resultado) => {
        if (error) return console.log(error.message)
        const obj={}
        if (resultado.length > 0){
            obj.listaimg = resultado
            res.json(obj)
        }else{
            res.json('No hay recetas detectadas')
        }
    })
});

app.get('/imagenes/add',(req,res)=>{
    const query = `INSERT INTO djangodb4oso.url_imgs(IMG,Receta_ID,Description) values (?,?,?)`
    connection.query(query,(error) => {
        if (error) return console.log(error.message)
        res.json('Imagen agregada correctamente')
    })
});


// Post recetas el cual debe pedir ----> Categoria,Nombre,Ingredientes,Preparacion, Calificacion, Autor
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/recetas/add', (req, res) => {
    const receta = {
        // id: 7,
        categoria: req.body.categoria,
        nombre: req.body.nombre,
        ingredientes: req.body.ingredientes,
        preparacion: req.body.preparacion,
        calificacion: req.body.calificacion,
        autor: req.body.autor
    }
    console.log(receta); // Verifica los datos recibidos pero me los está entregando como undefined
    const query = `INSERT INTO djangodb4oso.Receta(categoria, nombre, ingredientes, preparacion, calificacion, autor) VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(query, [
        receta.categoria,
        receta.nombre,
        receta.ingredientes,
        receta.preparacion,
        receta.calificacion,
        receta.autor
    ], (error) => {
        if(error) return console.error(error.message)
        res.json('Receta registrada correctamente')
    }) 
});

// Ver receta personalizada
app.get('/recetas/:id',(req,res)=>{
    const {id} = req.params

    const query = `SELECT * FROM djangodb4oso.Receta where id = ${id};`
    connection.query(query,(error,resultado) => {
        if (error) return console.log(error.message)
        
        if (resultado.length > 0){
            console.log('Receta encontrada en el registro')
            res.json(resultado)
        }else{
            res.json('No se encuentra la receta en el registro')
        }
    })
});

app.get('/categorias', (req, res) => {
    const query = `SELECT DISTINCT categoria FROM djangodb4oso.Receta`;
    connection.query(query, (error, resultado) => {
        if (error) return console.log(error.message);
        if (resultado.length > 0) {
            const categorias = resultado.map(item => item.categoria);
            res.json({ categorias });
        } else {
            res.json('No hay categorías disponibles');
        }
    });
});

app.get('/recetas/Categoria/:Categoria', (req, res) => {
    const Categoria = req.params.Categoria;
    const query = `SELECT * FROM djangodb4oso.Receta WHERE Categoria = ?`;
    connection.query(query, [Categoria], (error, resultado) => {
        if (error) return console.log(error.message);
        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay recetas para esta categoría');
        }
    });
});

app.get('/buscar', (req, res) => {
    const Categoria = req.query.Categoria;  // Mantener 'Categoria' con mayúscula

    if (!Categoria) {
        return res.json('No se proporcionó una categoría para buscar');
    }

    const query = `SELECT * FROM djangodb4oso.Receta WHERE Categoria = ?`;
    connection.query(query, [Categoria], (error, resultado) => {
        if (error) {
            return res.status(500).json({ message: 'Error al buscar recetas por categoría' });
        }
        
        if (resultado.length > 0) {
            return res.json(resultado);
        } else {
            return res.json('No se encontraron recetas para esta categoría');
        }
    });
});




// COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS
// COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS
// COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS
// COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS
// COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS
// COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS COMENTARIOS

// Mostrar comentarios de una receta
app.get('/recetas/comentarios/:id',(req,res)=>{
    const {id} = req.params

    const query = `SELECT * FROM djangodb4oso.Comentario where Receta_ID = ${id};`
    connection.query(query,(error,resultado) => {
        if (error) return console.log(error.message)
        
        if (resultado.length > 0){
            console.log('Comentario encontrado en el registro')
            res.json(resultado)
        }else{
            res.json('No se encuentra el comentario en el registro')
        }
    })
}
);
// Funciona (Y)

app.post('/recetas/comentarios/add', (req, res) => {
    const comentario = {
        // id: 7,
        Usuario: req.body.Usuario,
        Receta_ID: req.body.Receta_ID,
        comentario: req.body.comentario
    }
    console.log(comentario); 

    const query = `INSERT INTO djangodb4oso.Comentario(Usuario, Receta_ID,Comentario ) VALUES (?, ?, ?)`;

    connection.query(query, [
        comentario.Usuario,
        comentario.Receta_ID,
        comentario.comentario
    ], (error) => {
        if(error) return console.error(error.message)
        res.json('Comentario registrado correctamente')
    }) 
}
);