const express = require('express');
const router = express.Router();

const dataUser = require('../../userData.json'); 

/**
 * @swagger
 * /userData/{subscriber_id}:
 *   get:
 *     summary: Obtener información del usuario utilizando el código de usuario respectivo
 *     tags: [userData]
 *     parameters:
 *       - in: path
 *         name: subscriber_id
 *         required: true
 *         description: Código del Usuario
 *         schema:
 *           type: string
 *           example: 50253531231
 *     responses:
 *       200:
 *         description: Éxito al ingresar el ID del usuario.
 *       404:
 *         description: Usuario no encontrado.
 */

router.get('/:subscriber_id', (req, res, next) => {
    const {subscriber_id} = req.params;
    // el .json no debe ser un object, debe ser un array para el .find
    const user = dataUser.find((data) => data.current_info[0].subscriber_id === subscriber_id);
    // verificar si el codigo_usuario es valido
    if (user) {
        res.status(200).json(user); 
    } else {
        res.status(404).json({ error: 'User Not Found' });
    }
});

module.exports = router;