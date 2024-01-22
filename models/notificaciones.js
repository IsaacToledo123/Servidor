const mongoose = require('mongoose');

const notificacionesSchema = new mongoose.Schema({
    hora: Date,
    descripcion: String,
}, {
      versionKey: false
});

module.exports = mongoose.model('Notificaciones', notificacionesSchema);