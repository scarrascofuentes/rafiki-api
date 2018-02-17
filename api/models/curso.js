const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CursoSchema = new Schema ({

    idCurso: {
        type: String
    },

    nivel: {
        type: String 
    },

    asignatura: {
        type: String
    },

    profesorJefe: {
        type: String
    },

    salaCurso: {
        type: String
    },

    totalAlumnos: {
        type: Number
    }
   
   
});

module.exports = mongoose.model('Curso', CursoSchema);