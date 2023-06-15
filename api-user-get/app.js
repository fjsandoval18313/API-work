const express = require('express');
const app = express();

const infoUserRoutes = require('./api/routes/infoUser');
const ofertaInfoRoutes = require('./api/routes/ofertaInfo');


// use methods
app.use('/infoUser', infoUserRoutes);
app.use('/ofertaInfo', ofertaInfoRoutes);
  
module.exports = app;