const express = require('express');
const router = express.Router();

const oferta = require('../../oferta.json'); 

router.get('/:codigo_oferta', (req, res) => {
    const {codigo_oferta} = req.params;
    // el .json no debe ser un object, debe ser un array para el .find
    const offer = oferta.find(offer => offer.codigo_oferta.toString() === codigo_oferta);
    // verificar si el codigo_oferta es valido
    if (offer) {
        res.json(offer); 
    } else {
        res.status(404).json({ error: 'offer not found' });
    }
});

module.exports = router;