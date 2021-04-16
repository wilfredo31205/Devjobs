
module.exports = {

    seleccionarSkills : (seleccionadas = [] , opciones) =>{

        console.log(seleccionadas); // se coloca seleccionada ya que cuando no tenemos nada solucionado , es mejor tener un arreglo vacio
        // ya que si no nos sale un error

        // las opciones es lo que le estamos pasando 


        const skills = ['HTML5', 'CSS3', 'CSSGrid', 'Flexbox', 'JavaScript',
         'jQuery', 'Node', 'Angular', 'VueJS', 'ReactJS', 'React Hooks', 'Redux',
          'Apollo', 'GraphQL', 'TypeScript', 'PHP', 'Laravel', 'Symfony', 'Python',
           'Django', 'ORM', 'Sequelize', 'Mongoose', 'SQL', 'MVC', 'SASS', 'WordPress'];


            let  html = '';

            skills.forEach(skill=>{ // iterando con el foreach  y concatenando con el template string del html

                html +=`
                
                <li ${seleccionadas.includes(skill) ?'class="activo"' : ''}>${skill}</li> 

                
                `;
    //<li ${seleccionadas.includes(skill) ?'class="activo"' : ''}>${skill}</li>  include nos dice si algo existe nos tira true y si no, false
    // en este caso le decimos que si tiene un skill seria true, que esta en la lista y que no los traiga subrayado
    // le pasamos la clase de activo para que nos los subrayej



            });


            return opciones.fn().html = html; // importando a otros archivos 

    },

    tipoContrato: (seleccionado , opciones)=>{ // seleccionado nos va a retornar el tipo de contrato y que opciones hay

        // seleccionado es lo que tengamos en nuestra base de datos

        // {{#tipoContrato vacante.contrato}} se pasa directamente al helperts y opciones es lo que esta dentro del helper
        //tipocontrato , es decir todos los option

        console.log(seleccionado);

        return opciones.fn(this).replace(

            new RegExp(`value="${seleccionado}"`), '$& selected="selected"' // el signo de dolar y el aperson significa que se va a insertar un string ahi

            // `value="${seleccionado}"`), : cuando encuentre el que este seleccionado en los diferentes valores o diferentes option del archivo
            // editar-vacante , va a ir por ejemplo a la option de frelance, va a haber que no es ese, cuando llegue a tiempo completo
            // va a agregar lo que ya tiene, y va a agegar un atributo select


            // este codigo lo que hace es que trata de buscar que las opciones que seleccionamos 
            //esten entre las opciones del html y una vez que la encuentra , utilizamos replace, para que inyecte este Selection
            //en el valor que este seleccionado y se llene automaticamnte


        )
    
    
    },

        mostrarAlertas : (errores = {},  alertas  )=>{ // creando helpers que se  va  pasar en el layout 

                //  html += `<div class="${categoria} alerta"> //pasando las categorias o inyectando las categorias en un div 
 


            const categoria = Object.keys(errores); // con .keys accedemos a las llaves de los objetosm

            let html = '';

            if(categoria.length){ // si existe una categoria



                errores[categoria].forEach(error=>{ // foreach para iterar por cada error


                        html += `<div class="${categoria} alerta"> 
                        ${error}

                        </div>`;

                })



            }
            return alertas.fn().html = html; // retornando las alertas , con fn(); le decimos que alerta va a hacer una funcion
            

            ////console.log(categorias);

            //console.log(errores[categorias]);

            // lo que vienen siendo los errores es lo que viene a hacer para que se muestren las alertas 
            // // y lo que viene siendo alertas es lo que vamos  a inyectar lo que es el html 

            // console.log(errores);

            // console.log('=====')

            // console.log(alertas.fn());

        }
    

}



 