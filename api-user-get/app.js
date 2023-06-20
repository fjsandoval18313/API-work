const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


const infoUserRoutes = require('./api/routes/infoUser');
const ofertaInfoRoutes = require('./api/routes/ofertaInfo');
const accionesRoutes = require('./api/routes/userdata');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// prevenir CORS errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*"); // permitir acceso a todos *
    res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});


// use methods
app.use('/dataPrueba/infoUser', infoUserRoutes);
app.use('/dataPrueba/ofertaInfo', ofertaInfoRoutes);
app.use('/dataPrueba/acciones', accionesRoutes);

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