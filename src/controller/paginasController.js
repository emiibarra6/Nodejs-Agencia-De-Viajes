import {viaje} from '../models/Viaje.js'
import {Testimonial} from '../models/Testimoniales.js'

const paginaInicio = async(req,res) => {
    //Forma de ejecutar varias consultas a la vez
    //y no tener varias await que bloquean codigo
    //Independientes
    const promiseDB = [];
    promiseDB.push(viaje.findAll({ limit : 3}));
    promiseDB.push(Testimonial.findAll({limit:3}))

    //Consultar 3 viajes del modelo viaje
    try {
        const resultado = await Promise.all(promiseDB);
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });   
    } catch (error) {
        console.log(error)
    }
}

const paginaNosotros =  (req,res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViaje = async (req,res) => {
    //Consultar la bd
    const viajes = await viaje.findAll();

    res.render('viajes', {
        pagina: 'Próximos viajes',
        viajes
    });
}

const paginaTestimoniales = async (req,res) => {
    const testimoniales = await Testimonial.findAll();
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    });
}

//muestra un viaje por su slug:
const paginaDetalleViaje = async (req,res) => {
    const { viajeParam } = req.params;
    try {
        const resultado = await viaje.findOne({ where: { slug: viajeParam }});
        res.render('viaje', {
            pagina: 'Informacion viaje',
            resultado
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViaje,
    paginaTestimoniales,
    paginaDetalleViaje
}