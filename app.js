const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const notificaciones = require('./routes/routesNotificaciones');
const routesClientes = require("./routes/routesClientes")
const respuesta =require("./routes/routesNotiRes")


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const connectToDatabase = require('./connection/connect');

connectToDatabase();

app.use("/api",notificaciones)
app.use("/api", routesClientes);
app.use("/api",respuesta);




module.exports = app;