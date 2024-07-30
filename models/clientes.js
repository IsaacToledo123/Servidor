const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    sexo: {
        type: String,
        required: true,
    },
    objetivos: {
        type: String,
    },
    plan: {
        type: String
    },



}, {
    versionKey: false
});

module.exports = mongoose.model('Usuario', usuarioSchema);

