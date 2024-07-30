const mongoose =require('mongoose')

const semanaSchema= new mongoose.Schema({
lunes:String,
martes:String,
miercoles:String,
jueves:String,
viernes:String,
sabado:String,
domingo:String
})
module.exports=mongoose.model('semana',semanaSchema)