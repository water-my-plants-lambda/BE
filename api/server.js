const express = require('express');
const server = express();


server.use(express.json());
// server.use('/api/login');

server.get('/', (req, res) => {
  res.send('server is up');
})

module.exports = server;
