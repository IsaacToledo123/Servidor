const mongoose=require('mongoose')

const ejercicio= new mongoose.Schema({
titulo:String,
cuerpo:String,
descripcion:String
})

module.exports=mongoose.model('Ejercicio', ejercicio);