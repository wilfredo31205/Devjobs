

const mongoose = require('mongoose');
const Vacante = require('../models/Vacantes');

exports.mostrarTrabajo = async (req,res, next) => {


    //const vacantes = await Vacante.find(); // con fild traemos todos los registros o vacantes 
    const vacantes = await Vacante.find().lean();

    if(!vacantes) return next();

    res.render('home',{


        NombrePagina :'devJobs',
        tagLine : 'Encuentra y publica trabajos para todas las areas',
        barra : true,
        boton:true,
        vacantes // pasandole el resultado a la vista 



    })

}

