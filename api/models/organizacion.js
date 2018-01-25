'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var username = 'Rafiki';
// var password = encodeURIComponent('#Zeus2018');
// var database = 'admin';
// var port = '27017';
// var host = '54.233.193.162';


// // Añadir conexion con MongoDB aqui
// //mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}`, (err, res) => {
// mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}`, (err, res) => {
//     if(err) {
//         return console.log(`Error al conectarse a la BD: ${err}`);
//     }
//     console.log('Conexion con la BD OK...!');
// });

const OrganizacionSchema = new Schema ({
    nombre : String,
    rbd: Number, // Codigo de cada establecimiento
    descripcion: String, 
    reconocimientoOficial: String, // Fecha
    dependencia: String, // Subvencionado, Municipal, etc
    sostenedor: String, // Corporacion o Sociedad sostenedora
    orientacionReligiosa: String,
    direccion: {
        calle: String,
        region: String,
        comuna: String
    },
    correo: String,
    telefono: String,
    web: String,
    director: String,
    numVacantes: Number,
    fechaPostulacion:{
        inicio: String,
        cierre: String
    },
    mensualidad: Number,
    totalAlumnosMatriculados: Number,
    promAlumnosCurso: Number,
    puntajeSimce: Number,
    //proyectosEducativos: Array,
    //nivelEnsenanza: [], // Media, Basica, PreKinder, etc
    //usuarios: [],
    //cursos: []


    /*En Swagger en la definicion de Organizacion
          proyectosEducativos:
            type: array
            items: 
                type: string 
          */
});

module.exports = mongoose.model('organizaciones', OrganizacionSchema);