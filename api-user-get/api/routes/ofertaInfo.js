const express = require('express');
const router = express.Router();

const oferta = require('../../oferta.json'); 

/**
 * @swagger
 * /dataPrueba/ofertaInfo/{codigo_oferta}:
 *   get:
 *     summary: Obtener informacion de las ofertas utilizando el codigo de oferta respectivo
 *     tags: [ofertaInfo]
 *     parameters:
 *       - in: path
 *         name: codigo_oferta
 *         required: true
 *         description: Codigo de Oferta
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Offer input success!
 *       404:
 *         description: Offer Not Found
 */

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

/**
 * @swagger
 *  /dataPrueba/ofertaInfo/crearOrden:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Orden]
 *     parameters:
 *       - in: body
 *         name: orden
 *         description: Datos de la orden.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ID:
 *               type: string
 *           example:
 *             ID: "ABC123"
 *     responses:
 *       201:
 *         description: Orden creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 orden:
 *                   type: object
 *                   properties:
 *                     ID:
 *                       type: string
 *             example:
 *               message: Orden creada
 *               orden:
 *                 ID: "ABC123"
 */

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