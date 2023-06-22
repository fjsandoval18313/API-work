const express = require('express');
const router = express.Router();

const users = require('../../users.json'); 

/**
 * @swagger
 * /dataPrueba/infoUser/{codigo_usuario}:
 *   get:
 *     summary: Obtener informacion del usuario utilizando el codigo de usuario respectivo
 *     tags: [InfoUser]
 *     parameters:
 *       - in: path
 *         name: codigo_usuario
 *         required: true
 *         description: Codigo del Usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User ID input success!
 *       404:
 *         description: User Not Found
 */
router.get('/:codigo_usuario', (req, res, next) => {
    const {codigo_usuario} = req.params;
    // el .json no debe ser un object, debe ser un array para el .find
    const user = users.find(user => user.codigo_usuario.toString() === codigo_usuario);
    // verificar si el codigo_usuario es valido
    if (user) {
        res.status(200).json(user); 
    } else {
        res.status(404).json({ error: 'User Not Found' });
    }
});

module.exports = router;