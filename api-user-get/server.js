const http = require('http');
const app = require('./app')
const port = process.env.PORT || 3000; // puerto 

const server = http.createServer(app);
// API get segun el path /dataPrueba/{infoUser}/{codigo_usuario}

// comienza servidor
server.listen(port, () => {
  console.log('Server running...');
});