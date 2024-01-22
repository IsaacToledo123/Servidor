const express = require('express');
const cors =require('cors')
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000

const connectToDatabase = require('./connection/connect');

connectToDatabase();

const notificaciones = require('./routes/routesNotificaciones')
const usuario =require('./routes/routesClientes')
app.use('/api',notificaciones);
app.use('/api',usuario)
app.listen(PORT, () => {

      console.log(`Servidor en ejecución en el puerto ${PORT}`);

});

