const express = require('express');
const router = express.Router();

const oferta = require('../../oferta.json'); 

router.get('/:codigo_oferta', (req, res, next) => {
    const {codigo_oferta} = req.params;
    // el .json no debe ser un object, debe ser un array para el .find
    const offer = oferta.find(offer => offer.codigo_oferta.toString() === codigo_oferta);
    // verificar si el codigo_oferta es valido
    if (offer) {
        res.status(200).json(offer); 
    } else {
        res.status(404).json({ error: 'Offer Not Found' });
    }
});


router.post('/crearOrden', (req, res, next) => {
    const orden = {
        ID: req.body.ID
    };
    res.status(201).json({
        message: 'Orden creada',
        orden: orden
    });
});

module.exports = router;