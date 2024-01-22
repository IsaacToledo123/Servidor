const express=require('express')
const { getNotificaciones,createNotificacion}=require('../controllers/notificacionesController')
const router= express.Router();

router.post('/notificaciones',createNotificacion);
router.get('/notificaciones',getNotificaciones);


module.exports=router;