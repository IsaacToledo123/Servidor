const express = require('express');
const cors = require('cors');
const https = require('https'); // Change from http to https
const fs = require('fs');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;
const connectToDatabase = require('./connection/connect');
connectToDatabase();

// SSL Certificate
const options = {
  key: fs.readFileSync('/etc/nginx/ssl/nginx-selfsigned.key'), // Path to your private key
  cert: fs.readFileSync('/etc/nginx/ssl/nginx-selfsigned.crt') // Path to your certificate
};

// Routes
const notificaciones = require('./routes/routesNotificaciones');
const usuario = require('./routes/routesClientes');
const respuesta = require('./routes/routesNotiRes');
const rutina = require('./routes/rutinasR');
const semana = require('./routes/semanaR');
const ejercicio = require('./routes/ejerciciosR');
const pago = require('./routes/pagosR');

app.use('/api', notificaciones);
app.use('/api', usuario);
app.use('/api', respuesta);
app.use('/api', rutina);
app.use('/api', semana);
app.use('/api', ejercicio);
app.use('/api', pago);

// Create HTTPS server
const server = https.createServer(options, app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  },
});

let rooms = 0;

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  const roomName = `Room-${++rooms}`;
  socket.join(roomName);
  io.emit('newRoom', roomName);

  socket.on('joinRoom', room => {
    socket.join(room);
  });

  socket.on('clientMessage', (message) => {
    io.to(roomName).emit('adminMessage', message);
    console.log(roomName, message);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
