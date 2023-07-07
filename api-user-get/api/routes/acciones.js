const express = require('express');
const router = express.Router();
const users = require('../../users.json');
const ofertas = require('../../oferta.json');
const acciones = require('../../acciones.json');

/**
 * @swagger
 * /dataPrueba/acciones/{id}:
 *   get:
 *     summary: Obtener informacion de las acciones del usuario por su codigo de usuario respectivo
 *     tags: [acciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Codigo del Usuario
 *         schema:
 *           type: string
 *           example: 1050-1053
 *     responses:
 *       200:
 *         description: User input Success!
 *       404:
 *         description: User not found
 */

router.get('/:id', (req, res, next) => {
    const userID = req.params.id;
    const usuarios = [
    {
      id: users[0].codigo_usuario,
      nombre: users[0].nombre,
      servicio: users[0].servicio,
      mesespendientes: users[0].mesespendientes,
      acciones: [
        {
          nombre: acciones[0].accion,
          acciones_asignadas: []
        },
        {
          nombre: acciones[1].accion,
          acciones_asignadas: []
        }
      ]
    },
    {
      id: users[1].codigo_usuario,
      nombre: users[1].nombre,
      servicio: users[1].servicio,
      mesespendientes: users[1].mesespendientes,
      acciones: [
        {
          nombre: acciones[1].accion,
          acciones_asignadas: []
        },
        {
          nombre: acciones[0].accion,
          acciones_asignadas: []
        }
      ]
    },
    {
      id: users[2].codigo_usuario,
      nombre: users[2].nombre,
      servicio: users[2].servicio,
      mesespendientes: users[2].mesespendientes,
      acciones: [
        {
          nombre: acciones[0].accion,
          acciones_asignadas: []
        }
      ]
    },
    {
      id: users[3].codigo_usuario,
      nombre: users[3].nombre,
      servicio: users[3].servicio,
      mesespendientes: users[3].mesespendientes,
      acciones: [
        {
          nombre: acciones[1].accion,
          acciones_asignadas: []
        }
      ]
    }
  ];

// Asignar 4 acciones a los primeros dos usuarios y 1 acción a los demás
  usuarios.forEach((usuario, index) => {
    if (index < 2) {
      // Asignar 4 acciones a los usuarios 1 y 2
      usuario.acciones.forEach(accionPadre => {
        accionPadre.acciones_asignadas = obtain_acciones_asignadas(4);
      });
    } else {
      // Asignar 1 acción a los demás usuarios
      usuario.acciones.forEach(accionPadre => {
        accionPadre.acciones_asignadas = obtain_acciones_asignadas(1);
      });
    }
  });
  const user = usuarios.find((usuario) => usuario.id ===userID);
  if (!user){
    return res.status(404).json({message: 'ID Not Found'});
  } else{
    res.status(200).json(user);
  }
});




// Función para obtener acciones 
function obtain_acciones_asignadas(cantidad) {
  const accionesDisponibles = [
    {
      nombre: acciones[0].accion,
      ofertas_asignadas: [ofertas[0].nombre,ofertas[1].nombre, ofertas[2].nombre]
    },
    {
      nombre: acciones[1].accion,
      ofertas_asignadas: [ofertas[0].nombre, ofertas[1].nombre, ofertas[2].nombre]
    },
  ];

  return accionesDisponibles.slice(0, cantidad).map(accion => ({ ...accion }));
}



module.exports = router;