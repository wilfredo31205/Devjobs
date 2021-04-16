
const { raw } = require('body-parser');
const mongoose = require('mongoose');
const { verificarUsuario } = require('./authControllers');
//const Vacante = require('../models/Vacantes');
//const Vacantes = require('../models/Vacantes'); // de esta forma importamos un modelo en node,js

const Vacante = mongoose.model('Vacante'); // esta es la segunda forma de importar un modelo 



exports.formularioNuevaVacante = (req, res ) =>{

    res.render('nueva-vacante',{

        NombrePagina : 'Nueva Vacante',
        tagLine : 'Llena el formulario  y publica tu vacante',
        cerrarSesion: true,
        nombre: req.user.nombre // nombre del usuario que viene de req.user.nombre




    })

}

exports.agregarVacante = async  (req, res)=>{


  try {
    

    const vacante =  new Vacante(req.body); // de esta forma mapeamos los campos automaticamente con las instancias 



    // Usuario autor de la vacante}

    vacante.autor = req.user._id;  // autor es el campo o nombre del modelo 

    // la referencia del usuario autenticado se guarda en user ._id que viene siendo el id de quien lo creo 


    // CREAR ARREGLO DE HABILIDADES
 
    vacante.skills = req.body.skills.split(','); // con split , dividimos los espacio 
 
      console.log(vacante);

      console.log(req.body);
 
    // almacenar en la base de datos
 
    const nuevaVacante = await vacante.save();
 
   res.redirect(`/vacantes/${nuevaVacante.url}`);
 


  } catch (error) {
    
    console.log(error);

  }

}

exports.mostrarVacante =  async (req,res , next )=>{


    const vacante = await Vacante.findOne({url: req.params.url}); // .url porque esta definidido en el routes

    // si no hay vacante

    if(!vacante) return next();

    
    res.render('vacante',{

      vacante,
      NombrePagina : vacante.titulo,
      barra : true


    });


}

exports.formEditarVacante = async (req, res, next)=>{


  try {
    
    
    const vacante = await Vacante.findOne({url : req.params.url});

    if(!vacante) return next();

    res.render('editar-vacante',{


      vacante,
      NombrePagina : `Editar - ${vacante.titulo}`, // pasandole el titulo que viene de la base de datos

      cerrarSesion: true,
      nombre: req.user.nombre // nombre del usuario que viene de req.user.nombre


    })

  } catch (error) {
    
    console.log(error);


  }

}

exports.editarVacante = async (req, res,next)=>{


  const vacanteActualizada = req.body;


  vacanteActualizada.skills = req.body.skills.split(',');

  const vacante = await Vacante.findOneAndUpdate({url: req.params.url}, // el siguiente parametro es con que
    // lo vamos a actualizar, en este caso le pasamos vacanteactualizada, y el tercer valor son las opciones de config.
    
    vacanteActualizada,{

      new: true, // nos retorna el nuevo valor actualizado 
      runValidators : true  //  para que todo lo que pusimos en el modelo lo tome 



    });

    res.redirect(`/vacantes/${vacante.url}`); // vacantes es la url de editar  vacante  y  vacante.url  es el resultado 
    // de la actualizacion es decir esto : 

    //const vacante = await Vacante.findOneAndUpdate


    // es decir de esto : router.post('/vacantes/editar/:url',vacantesController.editarVacante);

}
 
// Validar y Sanitizar los campos de las nuevas vacantes
exports.validarVacante = (req, res, next) => {
  // sanitizar los campos
  req.sanitizeBody('titulo').escape();
  req.sanitizeBody('empresa').escape();
  req.sanitizeBody('ubicacion').escape();
  req.sanitizeBody('salario').escape();
  req.sanitizeBody('contrato').escape();
  req.sanitizeBody('skills').escape();

  // validar
  req.checkBody('titulo', 'Agrega un Titulo a la Vacante').notEmpty();
  req.checkBody('empresa', 'Agrega una Empresa').notEmpty();
  req.checkBody('ubicacion', 'Agrega una Ubicación').notEmpty();
  req.checkBody('contrato', 'Selecciona el Tipo de Contrato').notEmpty();
  req.checkBody('skills', 'Agrega al menos una habilidad').notEmpty();

  const errores = req.validationErrors();

  if(errores) {
      // Recargar la vista con los errores
      req.flash('error', errores.map(error => error.msg)); // iterando x cada error con map 

      res.render('nueva-vacante', {
          nombrePagina: 'Nueva Vacante',
          tagline: 'Llena el formulario y publica tu vacante',
          cerrarSesion: true,
          nombre : req.user.nombre,
          mensajes: req.flash()
      })
  }

  next(); // siguiente middleware
}

exports.eliminarVacante = async (req,res)=>{

    const { id} = req.params;

    const vacante = await Vacante.findById(id);
    
   // console.log(vacantes);

    // verificando que quien elimine la vacante es la persona que lo creo 

   
    if(verificarAutor(vacante , req.user)){ // t5oma 2 parametros , vacante que es lo que estamos 
      // retornando de la  base de datos y el usuario actual , que lo obtenemos con req.user 

      vacante.remove(); //  elimina la vacante de la base de datos
      res.status(200).send('Vacante Eliminada Correctamente');


      // if(verificarAutor(vacante , req.user)) = verificamos el autor , le pasamos la vacante que estamos consultando 

      // vacante es el objeto que viene desde la bd con la informacion es decir esto  y dentro del objeto en sus propiedades va a estar el autor : 
      /*
      
                                  {
                            [0]   salario: '5000',
                            [0]   skills: [ 'CSS3', 'Node', 'Angular' ],
                            [0]   _id: 6077be9a271dfe08bc4bea6a,
                            [0]   titulo: 'programador web',
                            [0]   empresa: 'universal',
                            [0]   ubicacion: 'av mexico',
                            [0]   contrato: 'freelance',
                            [0]   descripcion: '<div>experto en react</div>',
                            [0]   candidatos: [],
                            [0]   autor: 6073a44ecd4f7625f4c0eee4,
                            [0]   url: 'programador-web-4giul0dio',
                            [0]   __v: 0
                                  
      */ 

      // todo bien,  si es el usuario ,eliminar
    } else {

        // no permitido

        res.status(403).send('Error');

    }
//console.log(id);



}

const verificarAutor = (vacante = {}, usuario = {}) =>{

  if(!vacante.autor.equals(usuario._id)){ // si la vacante , su autor no es igual al usuario._id, es decir es diferente


      return false // entonces retorna false

  }

      return true; // si el autor de esta vancate es el mismo que el usuario autenticado, entonces retornalo como true, en caso contratio como falsed

}