const express = require('express');
const router = express.Router();


router.get('/:id', (req, res, next) => {
    const userID = parseInt(req.params.id);
    const usuarios = [
    {
      id: 1,
      nombre: "Usuario 1",
      acciones: [
        {
          nombre: "Migracion BYOD",
          acciones_asignadas: []
        },
        {
          nombre: "Migracion Prepago",
          acciones_asignadas: []
        }
      ]
    },
    {
      id: 2,
      nombre: "Usuario 2",
      acciones: [
        {
          nombre: "Migracion BYOD",
          acciones_asignadas: []
        },
        {
          nombre: "Migracion Prepago",
          acciones_asignadas: []
        }
      ]
    },
    {
      id: 3,
      nombre: "Usuario 3",
      acciones: [
        {
          nombre: "Migracion BYOD",
          acciones_asignadas: []
        }
      ]
    },
    {
      id: 4,
      nombre: "Usuario 4",
      acciones: [
        {
          nombre: "Migracion Prepago",
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
        accionPadre.acciones_asignadas = obteneracciones_asignadas(4);
      });
    } else {
      // Asignar 1 acción a los demás usuarios
      usuario.acciones.forEach(accionPadre => {
        accionPadre.acciones_asignadas = obteneracciones_asignadas(1);
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
function obteneracciones_asignadas(cantidad) {
  const accionesDisponibles = [
    {
      nombre: "Renovacion",
      ofertas_asignadas: ["Oferta 1", "Oferta 2", "Oferta 3"]
    },
    {
      nombre: "Descuento",
      ofertas_asignadas: ["Oferta 4", "Oferta 5", "Oferta 6"]
    },
  ];

  return accionesDisponibles.slice(0, cantidad).map(accion => ({ ...accion }));
}



module.exports = router;