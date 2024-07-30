const mongoose = require('mongoose');

const notificacionesSchema = new mongoose.Schema({
    hora: Date,
    descripcion: String,
    status:Boolean
}, {
      versionKey: false
});

module.exports = mongoose.model('Notificaciones', notificacionesSchema);