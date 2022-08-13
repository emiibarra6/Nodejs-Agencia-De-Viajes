import {Router} from 'express';
import { paginaInicio,
         paginaNosotros,
         paginaViaje,
         paginaTestimoniales,
         paginaDetalleViaje
        } 
        from '../controller/paginasController.js';
import { guardarTestimonial } from '../controller/testimonialController.js';
const r = Router();

r.get('/', paginaInicio);

r.get('/nosotros', paginaNosotros);

r.get('/viajes', paginaViaje);

r.get('/viajes/:viajeParam', paginaDetalleViaje);

r.get('/testimoniales', paginaTestimoniales);

r.post('/testimoniales', guardarTestimonial);

export default r;