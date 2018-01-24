'use strict';
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

const mongoose = require('mongoose');

var username = 'Rafiki';
var password = encodeURIComponent('#Zeus2018');
var database = 'rafiki-test';
var port = '27017';
var host = '54.233.193.162';


// Añadir conexion con MongoDB aqui
//mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}`, (err, res) => {
mongoose.connect(`mongodb://${host}:${port}/${database}`, (err, res) => {
    if(err) {
        return console.log(`Error al conectarse a la BD: ${err}`);
    }
    console.log('Conexion con la BD OK...!');
});

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1/:' + port + '/hello?name=Scott');
  }
  if (swaggerExpress.runner.swagger.paths['/users']) {
    console.log('try this:\ncurl http://127.0.0.1/:' + port + '/users?name=Scott');
  }
});

var ModelOrganizacion = require('./api/models/organizacion');

app.get('/organizacion', (req, res) => {
  ModelOrganizacion.find({}, (err, organizacion) => {
      console.log(organizacion.length);
      if(err) return res.status(500).send({message: `Error al realizar peticion: ${err}`});
      if(!organizacion) return res.status(400).send({message: 'No existe ninguna organizacion'});

      res.status(200).send({organizacion});
  });
});

// Buscar por uno en especifico
app.get('/organizacion/:id', (req, res) => {
  let organizacionID = req.params.id;

  ModelOrganizacion.findById(organizacionID, (err, organizacion) => {
    if(err) return res.status(500).send({message: `Error al realizar peticion: ${err}`});
    if(!organizacion) return res.status(400).send({message: 'El usuario no existe'});
    res.status(200).send({organizaciones : organizacion});
    console.log(organizacion);
  });
});


app.get('/', (req, res) => {
  res.send('Hola');
});
