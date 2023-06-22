const express = require('express');
const router = express.Router();

const users = require('../../users.json'); 

/**
 * @swagger
 * /dataPrueba/infoUser/{codigo_usuario}:
 *   get:
 *     summary: Obtener información del usuario utilizando el código de usuario respectivo
 *     tags: [InfoUser]
 *     parameters:
 *       - in: path
 *         name: codigo_usuario
 *         required: true
 *         description: Código del Usuario
 *         schema:
 *           type: string
 *           example: 1050-1056
 *     responses:
 *       200:
 *         description: Éxito al ingresar el ID del usuario.
 *       404:
 *         description: Usuario no encontrado.
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