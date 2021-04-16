
const mongoose = require('mongoose'); // importando el orm mongosse

require('dotenv').config({path: 'variables.env'});

mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useUnifiedTopology: true, useCreateIndex: true}); // toma 2 párametros , una es la arl y la otra es la secciones 

mongoose.connection.on('error',(error) => {


    console.log(error);


})

// Importando los modelos y se van a ir agregando a la conexion  de la base de datos

require('../models/Vacantes');
require('../models/Usuarios');