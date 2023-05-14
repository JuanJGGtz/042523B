const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();

//Ver todos los procesos que extá corriendo node
//console.log('process.env', process.env)

//Crear el servidor de express
const app = express();


//BAse de datos
dbConnection();


//CORS
app.use(cors());

//Directorio Público
//Middelware
//Funcion que se ejecuta en el momento que alguien hace petición a mi servidor
app.use(express.static('public'))


//Lectura y parseo de body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));

//Eventos
app.use('/api/events', require('./routes/events'));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});