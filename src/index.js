import  express from 'express';
import r from './routes/index.routes.js';
import path from 'path';
import db from './config/db.js'
import dotenv from 'dotenv';

dotenv.config();
const app = express();

//Conectar la base de datos
try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}



//Definir puerto
const port = process.env.PORT  || 4000;

const __dirname = path.resolve();
//carpeta views config ubicacion
app.set("views", path.join(__dirname,"src/views"));
//Habilitar PUG
app.set('view engine' , 'pug');

// Obtener el año actual
//app.use se ejecuta en todos sus metodos. Get, post, put, etc
app.use( (req,res,next) => {
    // res.locals.unaVariable = 'Una nueva variable';
    // console.log(res.locals);
    const year = new Date();
    res.locals.actualYear = year.getFullYear();

    res.locals.titulo = 'Agencia de viajes';
    return next();
})

//Agregar body parser para leer los datos del form
app.use(express.urlencoded({extended:true}));

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar router
app.use('/' , r);


app.listen(port ,()=> {
    console.log(`El servidor esta en el port: ${port}`)
} )