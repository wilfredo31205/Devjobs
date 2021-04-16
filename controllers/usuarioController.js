


const mongoose = require('mongoose');
//const { replaceOne } = require('../models/Vacantes');
const Usuarios = require('../models/Usuarios');
const Vacantes = require('../models/Vacantes'); // de esta forma importamos un modelo en node,js

const multer = require('multer');

//const Usuarios = mongoose.model('Usuarios'); // esta es la segunda forma de importar un modelo 



exports.subirImagen = (req,res,next)=>{


    upload(req, res,function(error){ // upload es un metodo para subir imagenes 
        // en la subida de imagen puede ser que ocurra un error , por lo tanto lo tenemos aqui 


        if(error instanceof multer.MulterError){ // si se presenta un error

                return next; // nos va a dar el error
        }
    });

    next(); // si no hay errores, corre al siguiente middleware


    const upload = multer(configuracionMulter).single('imagen'); // colocamos entre parentesis, que ws el nombre del campo // configuracionMulter funcion que se va a declarar mas abajo 
    // . single es el bombre del carpo que vamos a leer, el que contiene los archivos



}




exports.formCrearCuenta = (req,res)=>{

    
    res.render('crear-cuenta',{

        NombrePagina :'Crea tu cuenta en   devJobs',
        tagLine : 'Comienza a publicar  tus vacantes gratis, solo debes de crear una cuenta',

    })

}

exports.validarRegistro = (req,res,next)=>{


    // sanitizarr los campos
    req.sanitizeBody('nombre').escape(); //  se le pasa el  campo a sanitizar
   // body('nombre').not().isEmpty().withMessage('El nombre es Obligatorio').escape(),


   req.sanitizeBody('email').escape();

   req.sanitizeBody('password').escape();

   req.sanitizeBody('confirmar').escape();

    //console.log(req.body);
    
    req.checkBody('nombre','el nombre es obligatorio').notEmpty();

    req.checkBody('email','el email es obligatorio').isEmail(); // que el email no est vacio

    req.checkBody('password','el password es obligatorio').notEmpty(); // que el email no est vacio

    req.checkBody('confirmar','confirmar password no puede ir vacio').notEmpty(); // que el email no est vacio

    
    req.checkBody('confirmar','El password es diferente').equals(req.body.password); // tomamos el campo confirmar y lo comparamos
    // con password para verificar que si la contraseña es la misma que confirmar clave





    const errores = req.validationErrors(); // en caso de que revise que checkbody esta vacio 
    //todos esos errores se van a almacenar en validationErrors


    if(errores){ // si hay errores



        req.flash('error',errores.map(error=>error.msg)); // map va a recorrer el arreglo, pero va  a retornar
        //los valores en el flash error y lo va a colocar uno por uno 

        // msg : viene del checkbody que nos muestra el error si un campo esta vacio 

        res.render('crear-cuenta',{ // volvemos a cargar la vista para pasarle los errores

            NombrePagina :'Crea tu cuenta en   devJobs',
            tagLine : 'Comienza a publicar  tus vacantes gratis, solo debes de crear una cuenta',
    
    
            mensajes : req.flash() // mandando a llamar el res.local para mostrarle los errores
            // con flash podemos mostrar los mensaje de error en la vista 


        });

        return;




    }

        // si toda la validacion es correcta

        next();





 //   console.log(errores);

  //  return // para que no se ejecute el siguiente midle.


}




exports.crearUsuario = async (req, res,next) => {

    console.log(req.body);
    // crear el usuario
    const usuario = await new Usuarios(req.body);
    try {
        await usuario.save(); // usuario guardado
        res.redirect('/iniciar-sesion'); // despues que se guarda dirigelo a iniciar-sesion
    } catch (error) {
        req.flash('error', error); // si hay error , le pasamos una clase de error y  el error qe esta aqui :

        // usuariosSchema.post('save', function(error, doc, next

        res.redirect('/crear-cuenta');
    }
}

// formulario para iniciar sesión
exports.formIniciarSesion = (req, res ) => {
    res.render('iniciar-sesion', {
        nombrePagina : 'Iniciar Sesión devJobs'
    })
}

exports.formEditarPerfil = (req,res )=>{

    res.render('editar-perfil',{

    
        NombrePagina : 'Edita tu perfil  en devjobs' ,
        usuario: req.user,
        cerrarSesion: true,
        nombre : req.user.nombre       





    })






exports.formEditarVacante = async (req, res) => {
    const vacante = await Vacante.findOne({ url: req.params.url});

    if(!vacante) return next();

    res.render('editar-vacante', {
        vacante,
        nombrePagina : `Editar - ${vacante.titulo}`,
        cerrarSesion: true,
        nombre : req.user.nombre,
        imagen : req.user.imagen
    })
}
/*
  pasar al siguiente error 


    if(error.name === 'MongoError' && error.code === 11000 ){
        next('Ese correo ya esta registrado');
    } else {
        next(error);
    }

 })

module.exports = mongoose.model('Usuarios',usuariosSchema);


*/

// // formulario para iniciar seccion 
// exports.formIniciarSesion =   (req, res)=>{

//         res.render('iniciar-sesion',{

//             NombrePagina : 'Iniciar Sesión en devjobs'


//         })



// }





}






// sanitizar y validar el formulario de editar perfiles
exports.validarPerfil = (req, res, next) => {
    // sanitizar
    req.sanitizeBody('nombre').escape();
   //req.sanitizeBody('email').escape();
    if(req.body.password){
        req.sanitizeBody('password').escape();
    }
    // validar
    req.checkBody('nombre', 'El nombre no puede ir vacio').notEmpty();
    req.checkBody('email', 'El correo no puede ir vacio').notEmpty();

    const errores = req.validationErrors();

    if(errores) {
        req.flash('error', errores.map(error => error.msg));

        res.render('editar-perfil', {
            nombrePagina : 'Edita tu perfil en devJobs',
            usuario: req.user,
            cerrarSesion: true,
            nombre : req.user.nombre,
     
            mensajes : req.flash()
        })
    }
    next(); // todo bien, siguiente middleware!
}

// Guardar cambios editar perfil
exports.editarPerfil = async (req, res) => {
    const usuario = await Usuarios.findById(req.user._id);

    usuario.nombre = req.body.nombre;
    //usuario.email = req.body.email;
    if(req.body.password) {
        usuario.password = req.body.password
    }



    await usuario.save();

    req.flash('correcto', 'Cambios Guardados Correctamente');
    // redirect
    res.redirect('/administracion');
}