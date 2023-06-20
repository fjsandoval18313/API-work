const http = require('http');
const app = require('./app')
const port = process.env.PORT || 3000; // puerto 

const server = http.createServer(app);

// comienza servidor
server.listen(port, () => {
  console.log('Server running...');
});

