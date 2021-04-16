
// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// const bcrypt = require ('bcryptjs');


// const usuariosSchema = new mongoose.Schema({

//     email : {

//         type : String,
//         unique : true,
//         lowercase : true,
//         trim : true


//     },

//     nombre : {


//         type :String,
//        required : true



//     },

    
//     password: {

//         type : String,
//          required : true,
//         trim : true



//     },

//     token :  String,
//     expira :  Date





// });


// usuariosSchema.pre('save',async function(next){
//     if(!this.isModified('password')) {
//         return next(); // deten la ejecución
//     }

//     const hash = await bcrypt.hash(this.password,12);

//     this.password = hash;

//     next();



// });
// // Envia alerta cuando un usuario ya esta registrado
// usuariosSchema.post('save', function(error, doc, next) { // creando una variable dentro de la funcion de error ,el doc que casi no se utiliza
//     // y next para pasar al siguiente error 


//     if(error.name === 'MongoError' && error.code === 11000 ){ // mongoerror , es el error que nos puede lanzar mongoose
//         // error.code === 11000 es el codigo del error que le tenemos que pasar 
//         next('Ese correo ya esta registrado');
//     } else {
//         next(error); // avanza al siguiente error
//     }

//  });

//  // Authenticar usuarios

 
//  usuariosSchema.method = { // .method nos permite agregar multiples funciones que van a ejecutarse junto a este schema


//     compararPassword : function(password){ // va a hacer una funcion que va a tomar un password 

//         return bcrypt.compareSync(password,this.password);//  comparesync : el password que esta el formulario
//         // y el password que esta hasheado nos retorna true o false 


//     }


//  }




// module.exports = mongoose.model('Usuarios',usuariosSchema);

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const usuariosSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }, 
    token: String,
    expira: Date, 
    imagen: String // LAS IMAGENES SE GUARDAN COMO STRING , GUARDAMOS LA  REFERENCIA EN EL SERVIDOR, NO LA IMAGEN COMO TAL 
    
});

// Método para hashear los passwords
usuariosSchema.pre('save', async function(next) {
    // si el password ya esta hasheado
    if(!this.isModified('password')) {
        return next(); // deten la ejecución
    }
    // si no esta hasheado
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
});
// Envia alerta cuando un usuario ya esta registrado
usuariosSchema.post('save', function(error, doc, next) {
    if(error.name === 'MongoError' && error.code === 11000 ){
        next('Ese correo ya esta registrado');
    } else {
        next(error);
    }
});

// Autenticar Usuarios
usuariosSchema.methods = {
    compararPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

module.exports = mongoose.model('Usuarios', usuariosSchema);