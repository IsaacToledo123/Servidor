const mongoose = require('mongoose');

const notificacionRespuestaSchema = new mongoose.Schema({
    hora: Date,
    descripcion: String,
    status:Boolean,
    idNotificacion: mongoose.Schema.Types.ObjectId,
}, {
      versionKey: false
});

module.exports = mongoose.model('NotificacionRespuesta', notificacionRespuestaSchema);