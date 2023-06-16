const express = require('express');
const app = express();
const morgan = require('morgan');

// require routes
const infoUserRoutes = require('./api/routes/infoUser');
const ofertaInfoRoutes = require('./api/routes/ofertaInfo');


// use methods
app.use('/dataPrueba/infoUser', infoUserRoutes);
app.use('/dataPrueba/ofertaInfo', ofertaInfoRoutes);
app.use(morgan('dev'));
  
module.exports = app;