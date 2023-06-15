const express = require('express');
const app = express();

const infoUserRoutes = require('./api/routes/infoUser');

// utilizamos el metodo infoUser
app.use('/infoUser', infoUserRoutes);
  
module.exports = app;