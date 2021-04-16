
import axios from  'axios';
import Swal from 'sweetalert2';




     document.addEventListener('DOMContentLoaded', () =>{


    const skills = document.querySelector('.lista-conocimientos');


        // limpiar las alertas


        let alertas = document.querySelector('.alertas'); // seleccionando el padre de las alertas 
        // es decir esto    <div class="alertas"> del archivo layout

        
        if(alertas){

            limpiarAlertas();



        }



    if(skills){ // si skils existe 

        skills.addEventListener('click',agregarSkills);

        // una vez que estemos en editar , llamar la funcion

        skillsSeleccionadas();
    }

})


    const vacantesListado = document.querySelector('#panel-administracion');

        if(vacantesListado){

                vacantesListado.addEventListener('click',accionesListado);
        }








    const skills = new Set(); // utilizando set para almaenar un arreglo 

 const agregarSkills = e =>{

    //console.log(e.target);
        
        if(e.target.tagName === 'LI'){ // taGName significa que si estoy presionando sobre el elemento li
            

            if(e.target.classList.contains('activo')){

                skills.delete(e.target.textContent);


                e.target.classList.remove('activo'); /// añadiendole una clase para cuando seleccione un skill se coloque un color de fondo 




                // quitarlo del set 


            }else{

                // agregar al set  y agregar la clase 


                skills.add(e.target.textContent);


                e.target.classList.add('activo'); /// añadiendole una clase para cuando seleccione un skill se coloque un color de fondo 




            }

              }

            const  skillsArray = [...skills]
            document.querySelector('#skills').value = skillsArray; // seleccionando el id de skills, es decir del input

            // y le pasamos como valor los skills... pero pasandole una copi 
            
            //console.log(e.target.textContent); // PARA SABER A CUAL OPCIONES EL USUARIO DA CLICK 

                // skills.add(e.target.textContent);


                // e.target.classList.add('activo'); /// añadiendole una clase para cuando seleccione un skill se coloque un color de fondo 


                //console.log(skills);

            //console.log('Si');
        } 


 

 const skillsSeleccionadas = ()=>{


    const seleccionadas = Array.from(document.querySelectorAll('.lista-conocimientos .activo '));

    console.log(seleccionadas);

        
        seleccionadas.forEach(seleccionada=>{

            skills.add(seleccionada.textContent)

        })


                // inyectando en el hidden 
             const  skillsArray = [...skills]
            document.querySelector('#skills').value = skillsArray; 


 },
 


 const limpiarAlertas = ()=>{
        
   
 
 const limpiarAlertas = () => {
     const alertas = document.querySelector('.alertas');
     const interval = setInterval(() => {
         if(alertas.children.length > 0 ) { // si alerta es mayor que 0 
             alertas.removeChild(alertas.children[0]); // remomueve la alerta por los hijos
         } else if (alertas.children.length === 0 ) { // si ya no hay mas alertas
             alertas.parentElement.removeChild(alertas); // seleccionando las alertas por el padre para eliminar todo el div de alertas
             clearInterval(interval); // detiene el interval 
         }
     }, 2000);

      }

       }

        // eliminar vacantes

        const accionesListado = (e)=>{

            e.preventDefault();

                console.log('presionando');

            if(e.target.dataset.eliminar){

                // dataset es la forma en la que accedemos al atriburo data-eliminar={{id}} 
                // que esta en el archivo o vista administracion.handlebars , si existe un eliminar , entonces lo filtra
        
                // eliminar por axios 

                   // const url = `${location.origin}/vacantes/eliminar/${e.target.dataset.eliminar}`; // colocando la ruta de eliminar  // nos va a traer nuestro servidor actual, ya que cuando hagamos el deploy esta ruta sea portable

                    // esta parte =  ${e.target.dataset.eliminar}`;se coloca el dataset para acceder al atributo vacantes/eliminar/:id',

                    console.log(url);



                  //  return ; // para que no se ejecute este codigo


                Swal.fire({
                    title: 'Confirmar Eliminacion?',
                    text: "Una vez eliminada ,no se puede recuperar!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar!',
                    cancelButtonText: 'No, cancelar'
                  }).then((result) => {
                    if (result.value) {


                            // enviar la peticion por axios 

                            const url = `${location.origin}/vacantes/eliminar/${e.target.dataset.eliminar}`; // colocando la ruta de eliminar  // nos va a traer nuestro servidor actual, ya que cuando hagamos el deploy esta ruta sea portable


                            // Axios para eliminar eel registro

                            axios.delete(url,{params:{url}})
                            .then(function(respuesta){

                                    if(respuesta.status === 200){

                                      Swal.fire(
                                        'Deleted!',
                                        respuesta.data, //'Your file has been deleted.',
                                         'success'
                                      );

                                      // TODO Eliminar del Dom

                                            e.target.parentElement.parentElement.parentElement.removeChild( e.target.parentElement.parentElement);
                                    }

                                    console.log(respuesta);

                            })

                            .catch(()=>{

                                Swal.fire({


                                    type: 'error',
                                    title: 'Hubo un error',
                                    text: 'No se puedo eliminar'


                                })




                            }





                    //   Swal.fire(
                    //     'Deleted!',
                    //     'Your file has been deleted.',
                    //     'success'
                    //   )
                    }
                  })














            } else if (e.target.tagName === 'A'){ // si damos click en unos de los 2 enlaces, ve a uno de ellos 

               console.log(e.target.tagName);   
               
               
                

                window.location.href = e.target.href;

            }


          //  console.log(e.target);


        }