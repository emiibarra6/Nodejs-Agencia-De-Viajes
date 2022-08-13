import {Testimonial} from '../models/Testimoniales.js'

const guardarTestimonial = async (req,res) => {
    //Validar
    const { nombre , email , mensaje } = req.body;
    const errores = [];

    if(nombre.trim() === '' ){
        errores.push( { mensaje: 'El nombre esta vacio' });
    }

    if(email.trim() === '' ){
        errores.push( { mensaje:  'El correo esta vacio' });
    }

    if(mensaje.trim() === '' ){
        errores.push( { mensaje: 'El mensaje esta vacio'});
    }

    if(errores.length > 0 ){
        //Mostrar la vista con errores

        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales' , {
            pagina: 'Testimoniales',
            errores,
            nombre,
            email,
            testimoniales,
            mensaje
        })
    }else{
        //Almacenarlo en la bd
        try {
          await Testimonial.create({
            nombre,
            email,
            mensaje
          });

          res.redirect('testimoniales');
        } catch (error) {
            console.log(error)
        }

    }
}

export {
    guardarTestimonial,
}