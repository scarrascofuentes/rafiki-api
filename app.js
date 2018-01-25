'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var mongoose = require('mongoose');


//Modelos
require("./api/models/user.js");
require('./api/models/organizacion');
require('./api/models/curso');

module.exports = app; // for testing

// Conexión servidor de pruebas
var username = 'Rafiki';
var password = encodeURIComponent('#Zeus2018');
var database = 'rafiki-test';
var port = '27017';
var host = '54.233.193.162';
mongoose.connect(`mongodb://${host}:${port}/${database}`, (err, res) => {
    if(err) {
        return console.log(`Error al conectarse a la BD: ${err}`);
    }
    console.log('Conexion con la BD OK...!');
});

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://54.233.193.162:27017/rafiki-test');
  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1/:' + port + '/hello?name=Scott');
  }
  if (swaggerExpress.runner.swagger.paths['/users']) {
    console.log('try this:\ncurl http://127.0.0.1/:' + port + '/users?name=Scott');
  }
});
var ModelNivel = require('./api/models/nivel');

// app.get('/niveles', (req, res) => {
//   ModelNivel.find({}, (err, nivel) => {
//       console.log();
//       if(err) return res.status(500).send({message: 'Error al realizar peticion: ${err}'});
//       if(!nivel) return res.status(400).send({message: 'No existe ningún nivel'});

//       res.status(200).send({nivel});
//       console.log(nivel);
//   });
// });


