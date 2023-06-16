const express = require('express');
const app = express();
const morgan = require('morgan');

// require routes
const infoUserRoutes = require('./api/routes/infoUser');
const ofertaInfoRoutes = require('./api/routes/ofertaInfo');
app.use(morgan('dev'));


// use methods
app.use('/dataPrueba/infoUser', infoUserRoutes);
app.use('/dataPrueba/ofertaInfo', ofertaInfoRoutes);
  
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    }) 
});


module.exports = app;