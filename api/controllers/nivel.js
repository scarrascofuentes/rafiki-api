'use strict';

var util = require('util');
var ModelNivel = require('../../api/models/nivel');
const Responses = require('../helpers/responses');
/** Exportación de las funciones para usar en el resto del código */
module.exports = {
  get_sigla: get_sigla,
  get_niveles: get_niveles,
  getNivelId: getNivelId,
  createNivel: createNivel,
  updateNivel: updateNivel,
  deleteNivel: deleteNivel

};
/** GET: Función que retorna la lista de niveles existentes en la BD */
function get_niveles (req, res){
  ModelNivel.find({}, (err, nivel) => {
      if(err) return res.status(500).send({message: 'Error al realizar peticion: ${err}'});
      if(!nivel) return res.status(400).send({message: 'No existe ningún nivel'});

      /** Si no existe error se retonan los niveles con status 200: OK */
      res.status(200).json(nivel)
      console.log(nivel);
  });

}
/** GET/ID: Se retorna un nivel al recibir por PATH el id del mismo. */
function getNivelId(req, res) {

  let id = req.swagger.params.id.value;
   /** FindById, busca dentro de la BD el nivel que se desea conseguir*/
  ModelNivel.findById(id, function(err, nivel){
      /** Si existe un error interno del servidor se retorna error 500 */
    if (err){
     
      res.status(500).send(Responses.getError({message: err.message}));
      return;
    }
    /** Si no existe el nivel se retorna error 404 */
    if (!nivel){
      res.status(404).send(Responses.getError({message: `nivel ${id} not found.`}));
      return;
    }

    res.json(nivel);
});
}
  

/** POST: Función que crea un nivel. */
function createNivel(request, response) {
  ModelNivel.create(request.body, function (err, nivel) {
    nivel.save(function(err){

      /** Si existe un error interno del servidor se retorna error 500 */
      if (err){
        response.status(500).send(Responses.getError({message: err.message}));
        return;
      }
      console.log(nivel);

      /** Se crea el nuevo nivel con los atributos requeridos */
      response.status(200).json({ 
        sigla : nivel.sigla,
        tipo_nivel : nivel.tipo_nivel,
        grado : nivel.grado,
        descripcion : nivel.descripcion,
        decreto : nivel.decreto
      });
    })
  });
}
/** PUT: Función que actualiza un nivel. */
function updateNivel(request, response) {
  let id = request.swagger.params.id.value;
  /** FindById, busca dentro de la BD el nivel que se desea actualizar */
  ModelNivel.findById(id, function(err, nivel) {
    if (err) {
      response.status(500).send(Responses.getError({message: err.message}));
      return;
    }
    /** Si el id no está asociado a algún nivel en la BD, se retorna un error 404 */
    if (!nivel) {
      response.status(404).send(Responses.getError({message: `nivel ${id} not found.`}));
      return;
    }
    /** Object.assign copia los valores del request.body al objeto nivel */
    nivel = Object.assign(nivel, request.body);
    nivel.save(id, function (err, nivel) {
      if (err) {
        /** si hay error al guardar se muestra un error 500 */
        response.status(500).send(Responses.getError({message: err.message}));
      }

      response.json(nivel);
    });
  });
}
/** DELETE: Función que elimina un nivel. */
function deleteNivel(request, response){
  let id = request.swagger.params.id.value;
  ModelNivel.findById(id, function(err, nivel) {
    if (err) {
      response.status(500).send(Responses.getError({message: err.message}));
      return;
    }
    /** Si el id no está asociado a algún nivel en la BD, se retorna un error 404 */
    if (!nivel) {
      response.status(404).send(Responses.getError({message:  `El nivel ${id} no ha sido encontrado.`}));
      return;
    }
    /** Se elimina de la BD el nivel asociado al id ingresado.
     * Si existe un error de conexión se manda el error 500
     * status(200) si todo salió bien.
     */
    nivel.remove(id, function (err, nivel) {
      if (err) {
        response.status(500).send(Responses.getError({message: err.message}));
      }
      response.status(200).json(Responses.getSuccess({message: `Nivel ${id} eliminado.`}));
    });
  });
}


