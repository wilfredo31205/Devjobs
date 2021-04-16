
const mongoose = require('mongoose'); // importando moongose

require('./config/db'); // importando la conexion de la base de datos

const express = require('express');
const exphbs  = require('express-handlebars'); // importando handlebars 
const path = require('path');
const router = require('./routes');
const cookieParser = require('cookie-parser'); // importando cookie-parser
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);  // pasandole la seccion
//const bodyParser = require('body-parser'); 
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('./config/passport'); // importando la config. de passport 
const bodyParser = require('body-parser');

const handlebars = require('handlebars');
//const expressValidator = require('express-validator');
//const flash = require('connect-flash');
//const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

require('dotenv').config({ path: 'variables.env'}); // instalamos la dependencia dotenv para que pueda acceder a ese archivo desde aqui

// de igual manera con path. ubicamos el archivo del entorno llamado variables.env



const app = express();


// habilitando body parser 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));






// validación de campos
app.use(expressValidator());


// Habiltando Handlebars

// app.engine('handlebars',

//     exphbs({

//       defaultLayout: 'layout', // especificando la hoja de html a crear
        
//         helpers: require('../DevJobs/helpers/handlebars') /* los helperts es una forma en la que registramos
        
//        // scripts , pára que se comuniquen directamente con handlebars antes de su salida 
//       //  */
//       //  helpers: require('./helpers/handlebars')
 
//     })

// );

app.engine('handlebars',
    exphbs({
        handlebars: allowInsecurePrototypeAccess(handlebars),
        defaultLayout: 'layout',
        helpers: require('./helpers/handlebars')
    })
);

app.set('view engine', 'handlebars');
// cargar archivos staticos
 app.use(express.static(path.join(__dirname, 'public')));

 app.use(cookieParser());

app.use(
         session({

    secret: process.env.SECRETO,
    key: process.env.KEY,
   resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection :  mongoose.connection})

 }));

 // iniciar passport 

 app.use(passport.initialize());

 app.use(passport.session());


// alertas  y flask messages

app.use(flash());


// crear nuestro middleware



 app.use((req,res,next) => {


    res.locals.mensajes = req.flash(); // siempre que tengamos un problema ,es decir siempre que tengamos un flash a enviar
    // estaremos llamando este metodo y se va a llenar auto las variables locales
    
    next();


 })
 




 //app.use('/',router());
 app.use('/', router());


//app.listen(5000);

//app.listen


app.listen(process.env.PUERTO); // aqui estamos accediento o conectando desde el puerto 


