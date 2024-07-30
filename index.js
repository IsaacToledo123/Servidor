const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;
const connectToDatabase = require('./connection/connect');
connectToDatabase();


const notificaciones = require('./routes/routesNotificaciones');
const usuario = require('./routes/routesClientes');
const respuesta = require('./routes/routesNotiRes');
const rutina=require('./routes/rutinasR');
const semana =require("./routes/semanaR");
const ejercicio=require('./routes/ejerciciosR');
const pago=require('./routes/pagosR');

const { log } = require('console');
app.use('/api', notificaciones);
app.use('/api', usuario);
app.use('/api', respuesta);
app.use('/api', rutina);
app.use('/api', semana);
app.use('/api', ejercicio);
app.use('/api', pago);





const server = app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});


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
      socket.join(room)
    })
  
    socket.on('clientMessage', (message) => {
        io.to(roomName).emit('adminMessage', message);
        console.log(roomName,message);
    });
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
  });
    
});
