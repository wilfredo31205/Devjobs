
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const slug = require('slug'); // importando slug, para que nos genere las url

const shortid = require('shortid'); // con shortid nos genera las url unicas, sin que se repitan

const vacantesSchema = new mongoose.Schema({

    // EN EL SCHEMA DEFINIOS TODOS LOS CAMPOS QUE VA A  TENER NUESTRA BD

    titulo:{

        type: String,
        required: 'El nombre de la vacante es obligatorio', // validacion en mongo 
        trim: true // trim corta los espacios , moongose lo hace por default 

    },

    empresa:{

        type: String,
        trim: true,
    },

    ubicacion: {


        type: String,
        trim: true,
        required: 'La ubicacion es obligatoria'
        
    },

    salario:{

        type: String,
        default: 0,
        trim: true,


    },

    contrato:{

        type: String,
        trim: true,


    },

    descripcion: {
        type: String,
        trim: true,

         },

    url : {

        type: String,
        lowercase: true,

    },

    skills: [String], // cuando esta en parentesis significa que es un arreglo de string

    candidatos:[{ // esto es un arreglo de objetos


        nombre: String,
        email: String,
        cv: String

    }],

    autor : { // haciendo referencia hacia al otro modelo


        type: mongoose.Schema.ObjectId,
        ref: 'Usuarios', // va a tomar la referencia del modelo de usuario
        required: 'El autor es obligatorio'


    }



});

vacantesSchema.pre('save', function(next){

    // creando la url 

    const url = slug(this.titulo);

    this.url = `${url}-${shortid.generate()}`;

    next();


})

module.exports = mongoose.model('Vacante', vacantesSchema); // dandole el nombre al modelo y pasandole Schema que define las vacantes

