const express =require('express')
const {getByid,createNotificacion,getNotificaciones,addClienteResponse} =require('../controllers/notificacionrespuestaController')

const router =express.Router();

router.post('/Respuesta',createNotificacion)
router.get('/Respuesta/:descripcion',getByid)
router.get('/Respuesta',getNotificaciones)
router.get('/Long',addClienteResponse)

module.exports=router;
