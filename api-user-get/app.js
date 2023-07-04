const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'API retenciones moviles PR',
        description: 'API de prueba de datos generados para usuarios, ofertas y acciones',
        version: '1.0.0',
        contact: {
          name: 'Fernando Sandoval',
        },
        servers: ['https://localhost:3000'],
      },
    },
    apis: ['./api/routes/infoUser.js', './api/routes/ofertaInfo.js', './api/routes/acciones.js', './api/routes/userDataPrueba.js'],
  };
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);




const infoUserRoutes = require('./api/routes/infoUser');
const ofertaInfoRoutes = require('./api/routes/ofertaInfo');
const accionesRoutes = require('./api/routes/acciones');
const userDataPruebaRoutes = require('./api/routes/userDataPrueba');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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


app.use('/dataPrueba/infoUser', infoUserRoutes);
app.use('/dataPrueba/ofertaInfo', ofertaInfoRoutes);
app.use('/dataPrueba/acciones', accionesRoutes);
app.use('/userDataPrueba',userDataPruebaRoutes);

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