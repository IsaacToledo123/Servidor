const mongoose = require('mongoose')

const rutina = new mongoose.Schema({
    titulo: String,
    ejercicio1: String,
    repeticiones1:String,
    ejercicio2: String,
    repeticiones2:String,
    ejercicio3: String,
    repeticiones3:String,
    ejercicio4: String,
    repeticiones4:String,
    ejercicio5: String,
    repeticiones5:String,

})
module.exports = mongoose.model('rutina', rutina)