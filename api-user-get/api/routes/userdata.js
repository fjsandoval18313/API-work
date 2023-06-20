const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  const usuarios = [
    {
      id: 1,
      nombre: "Usuario 1",
      acciones: [
        {
          nombre: "Acción Padre 1",
          acciones_asignadas: []
        },
        {
          nombre: "Acción Padre 2",
          acciones_asignadas: []
        }
      ]
    },
    {
      id: 2,
      nombre: "Usuario 2",
      acciones: [
        {
          nombre: "Acción Padre 1",
          acciones_asignadas: []
        },
        {
          nombre: "Acción Padre 2",
          acciones_asignadas: []
        }
      ]
    },
    {
      id: 3,
      nombre: "Usuario 3",
      acciones: [
        {
          nombre: "Acción Padre 1",
          acciones_asignadas: []
        }
      ]
    },
    {
      id: 4,
      nombre: "Usuario 4",
      acciones: [
        {
          nombre: "Acción Padre 1",
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

  res.status(200).json(usuarios);
});

// Función para obtener acciones hijas
function obteneracciones_asignadas(cantidad) {
  const accionesDisponibles = [
    {
      nombre: "Acción 1",
      ofertas_asignadas: ["Oferta 1", "Oferta 2", "Oferta 3"]
    },
    {
      nombre: "Acción 2",
      ofertas_asignadas: ["Oferta 4", "Oferta 5", "Oferta 6"]
    },
  ];

  return accionesDisponibles.slice(0, cantidad).map(accion => ({ ...accion }));
}



module.exports = router;