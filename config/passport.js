// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const mongoose = require('mongoose');
// const Usuarios = mongoose.model('Usuarios');


// passport.use(new  LocalStrategy({


//     usernameField : 'email', // diciendole a passport con cuales campos vamos autenticar al usuario

//     passwordField : 'password'




    
//     }, async (email,password , done)=>{ // esta funcion va a interactuar con la base de datos 
//         // le pasamos el email, password y el done es como next , que pase al siguiente

//         const usuario = await Usuarios.findOne({email}); // va a buscar el email en los usuarios

//         if(!usuario) return done(null, false,{ // false: negando usuario ya que no hay // null es el mensaje de error si hay alguno

//             message : 'Usuario no existente'


//         });

//         // el usuario existe, vamos a  verificar 

//         const verificarPass = usuario.compararPassword(password);
//         if(!verificarPass) return done(null, false, {
//             message: 'Password Incorrecto'
//         });

        
//         // si usuario existe  y el password es correcto 

//         return done(null, usuario) // pasandole null  ya que no hay mensaje , y luego le pasamos el usuario si todo esta bien 

//     }));

//     passport.serializeUser((usuario , done)=>done(null,usuario._id)); // el _id es por mongoose o mongo ya que asi es que lo utiliza

//     passport.deserializeUser(async (id,done)=>{ // done es párecido a next

//         const usuario = await Usuarios.findById(id).exec();

//         return done(null, usuario);



//     });

//     module.exports = passport;





const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');

passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
    }, async (email, password, done) => {
        const usuario = await Usuarios.findOne({ email });
        if(!usuario) return done(null, false, {
            message: 'Usuario No Existente'
        });

        // el usuario existe, vamos a verificarlo
        const verificarPass = usuario.compararPassword(password);
        if(!verificarPass) return done(null, false, {
            message: 'Password Incorrecto'
        });

        // Usuario existe y el password es correcto
        return done(null, usuario);
}));

passport.serializeUser((usuario, done) => done(null, usuario._id));

passport.deserializeUser(async (id, done) => {
    const usuario = await Usuarios.findById(id).exec();
    return done(null, usuario);
});

module.exports = passport;