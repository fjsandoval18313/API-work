const express = require('express');
const app = express();
const users = require('./users.json'); // asumiendo el mismo path del server.js

//const jsUsers = JSON.parse(users); no es necesario hacer un parse
app.get('/dataPrueba/:method_name/:codigo_usuario', (req, res) => {
    const { method_name, codigo_usuario } = req.params;
  
  
    // Verifica que sea un method valido y procede
    if (method_name === 'infoUser') {
      // el .json no debe ser un object, debe ser un array para el .find
      const user = users.find(user => user.codigo_usuario,toString() === codigo_usuario);
  
  
      // verificar si el codigo_usuario es valido
      if (user) {
        res.json(user); 
      } else {
        res.status(404).json({ error: 'User not found' });
      }
  
  
      // si el usuario es valido, entonces el metodo es invalido
    } else {
      res.status(400).json({ error: 'Method invalid' });
    }
  });
  
module.exports = app;