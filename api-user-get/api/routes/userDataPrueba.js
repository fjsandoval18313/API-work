const express = require('express');
const router = express.Router();

const users = require('../../users.json');
const ofertas = require('../../oferta.json');
const acciones = require('../../acciones.json');

/**
 * @swagger
 * /userDataPrueba/{id}:
 *   get:
 *     summary: Respuesta unificada de los endpoints segun el codigo de usuario.
 *     tags: [userDataPrueba]
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
      id: users[0].codigo_usuario, ...users[0], 
      acciones: [
        {
          nombre: acciones[0].accion1,
          acciones_asignadas: []
        },
        {
          nombre: acciones[1].accion2,
          acciones_asignadas: []
        }
      ]
    },
    {
      id: users[1].codigo_usuario, ...users[1],
      acciones: [
        {
          nombre: acciones[1].accion2,
          acciones_asignadas: []
        },
        {
          nombre: acciones[0].accion1,
          acciones_asignadas: []
        }
      ]
    },
    {
      id: users[2].codigo_usuario, ...users[2],
      acciones: [
        {
          nombre: acciones[0].accion1,
          acciones_asignadas: []
        }
      ]
    },
    {
      id: users[3].codigo_usuario, ...users[3],
      acciones: [
        {
          nombre: acciones[1].accion2,
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
        accionPadre.acciones_asignadas.forEach(accion => {
          const ofertasAsignadas = accion.ofertas_asignadas;
          const randomIndex = Math.floor(Math.random() * ofertasAsignadas.length);
          const ofertaAsignada = ofertasAsignadas[randomIndex];
          accion.ofertas_asignadas = [ofertaAsignada]; 
        });
      });
    } else {
      // Asignar 1 acción a los demás usuarios
      usuario.acciones.forEach(accionPadre => {
        accionPadre.acciones_asignadas = obtain_acciones_asignadas(1);
        accionPadre.acciones_asignadas.forEach(accion => {
            const ofertasAsignadas = accion.ofertas_asignadas;
            const randomIndex = Math.floor(Math.random() * ofertasAsignadas.length);
            const ofertaAsignada = ofertasAsignadas[randomIndex];
            accion.ofertas_asignadas = [ofertaAsignada]; 
          });
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
        nombre: acciones[2].accion3,
        ofertas_asignadas: [
          { nombre: ofertas[0].nombre, ...ofertas[0] },
          { nombre: ofertas[1].nombre, ...ofertas[1] },
          { nombre: ofertas[2].nombre, ...ofertas[2] }
        ]
      },
      {
        nombre: acciones[3].accion4,
        ofertas_asignadas: [
          { nombre: ofertas[0].nombre, ...ofertas[0] },
          { nombre: ofertas[1].nombre, ...ofertas[1] },
          { nombre: ofertas[2].nombre, ...ofertas[2] }
        ]
      },
    ];
  
    return accionesDisponibles.slice(0, cantidad);
  }


module.exports = router;