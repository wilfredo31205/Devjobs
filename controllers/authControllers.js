

// archivo de las autenticaciones

const passport = require('passport'); // importando passport 

const mongoose = require('mongoose');

const Vacante = mongoose.model('Vacante');




exports.autenticarUsuario = passport.authenticate('local',{ // authenticate revisa la configuracion


    successRedirect :  '/ok', // en caso de que todo este bien 

    failureRedirect : '/iniciar-sesion' ,// en caso de que todo este mal o haiga fallado 

    failureFlash : true,

    badRequestMessage: 'Ambos campos son obligatorios'

    
});


    // revisar si el usuario esta autenticado o no 




// Revisar si el usuario esta autenticado o no
exports.verificarUsuario = (req, res, next) => {

    // revisar el usuario
    if(req.isAuthenticated()){
        return next(); // estan autenticados
    }

    // redireccionar
    res.redirect('/iniciar-sesion');

}








    // exports.verificarUsuario = (req,res,next)=>{

    //     //revisar el usuario 

    //     if(res.isAuthenticated()){ // este metodo almacen y devuelve true o false si el usuario esta authenticado
    //         // si esta autenticado return next para que se vaya al siguiente middleware

    //         return next();  // estan authenticado// si esta autenticado return next , para que vaya al siguiente middlware


    //     }/// de lo contrario 
    //     // sino tiene una cuenta  redireccionar

    //     res.redirect('/iniciar-sesion')




    // }

exports.mostrarPanel = async (req,res )=>{

    // consultar el usuario autenticado 

    const vacantes = await Vacante.find({autor: req.user._id});

    




    res.render('administracion',{

        

        NombrePagina :'Panel de administracion ',
        tagLine : 'Crea y administra tus vacantes desde aqui',
        cerrarSesion: true,
        nombre: req.user.nombre, // nombre del usuario que viene de req.user.nombre

        vacantes, // pasando las vacantes a la vista
      

    })


}

exports.cerrarSesion = (req,res)=>{

    req.logout(); // metodo para cerrar sesion

    req.flash('correcto','Has cerrado Sesion correctamente');

    return res.redirect('/iniciar-sesion') // despues que cerremos sesion que nos dirija a iniciar sesion




}