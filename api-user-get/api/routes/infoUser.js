const express = require('express');
const router = express.Router();

const users = require('../../users.json'); 

router.get('/:codigo_usuario', (req, res) => {
    const {codigo_usuario} = req.params;
    // el .json no debe ser un object, debe ser un array para el .find
    const user = users.find(user => user.codigo_usuario.toString() === codigo_usuario);
    // verificar si el codigo_usuario es valido
    if (user) {
        res.json(user); 
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

module.exports = router;