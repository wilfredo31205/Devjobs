
const express = require('express');
const router = express.Router();

const homeControllers = require('../controllers/homeControllers'); // importando los controladores
const vacantesController = require('../controllers/vacantesController'); // importando los controladores
const usuariosController = require('../controllers/usuarioController'); // importando los controladores
const authController =  require('../controllers/authControllers'); // importando los controladores


module.exports = () =>{


    // router.get('/',(req,res)=>{

    //     res.send('funciona');

    // })
      

    router.get('/',homeControllers.mostrarTrabajo);

    // Crear Vacantes 

    router.get('/vacantes/nueva',
    
    authController.verificarUsuario,// si pasa la verificacion ,pasa al siguiente middleware
    vacantesController.formularioNuevaVacante
    
    );

   router.post('/vacantes/nueva',
   
   authController.verificarUsuario,
   vacantesController.validarVacante,
   vacantesController.agregarVacante); // para enviar las vacantes a la base de datos 


    // mostrar vacante

    router.get('/vacantes/:url',vacantesController.mostrarVacante);

    // editar vacante

    router.get('/vacantes/editar/:url',
    
    authController.verificarUsuario,
  //  vacantesController.validarVacante,
    vacantesController.formEditarVacante
    
    );


//   router.post('/vacantes/editar/:url',vacantesController.editarVacante);


   router.post('/vacantes/editar/:url', 
   authController.verificarUsuario,
   vacantesController.validarVacante,
   vacantesController.editarVacante
    );

    // crear cuentas
    router.get('/crear-cuenta',usuariosController.formCrearCuenta);


    router.post('/crear-cuenta',
        
    usuariosController.validarRegistro, // vamos a validar desde el controlador con express-validator y flash

    usuariosController.crearUsuario

    );

        // Aunteticar usuarrios
        router.get('/iniciar-sesion',usuariosController.formIniciarSesion);

        router.post('/iniciar-sesion',authController.autenticarUsuario);
        //router.get('/administracion',authController.mostrarPanel);

        // cerrar sesion

        router.get('/cerrar-sesion',
            authController.verificarUsuario,
            authController.cerrarSesion
        
        
        )

        // Panel de authenticacion 

       router.get('/administracion',
       authController.verificarUsuario,
       authController.mostrarPanel
       
       );

    
       // Editar perfil
 
    router.get('/editar-perfil',
     authController.verificarUsuario, 
     // usuariosController.validarPerfil, // verificando que el usuario este autenticado
       //usuariosController.validarPerfil,
      usuariosController.formEditarPerfil 
    );

    
    router.post('/editar-perfil',
    authController.verificarUsuario,
  //  usuariosController.subirImagen, // middlwware para subir imagenes  
    usuariosController.editarPerfil
   // usuariosController.validarPerfil,

     // verificando que el usuario este autenticado
     //  usuariosController.validarPerfil,
   // usuariosController.editarPerfil


);

  // Eliminar Vacante 

    router.delete('/vacantes/eliminar/:id',
    
      vacantesController.eliminarVacante
    
    );




        return router;


  } 


