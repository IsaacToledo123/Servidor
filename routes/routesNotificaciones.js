const express=require('express')
const { getNotificaciones,createNotificacion,updateNotificacion,getByid}=require('../controllers/notificacionesController')
const router= express.Router();

router.post('/notificaciones',createNotificacion);
router.get('/notificaciones',getNotificaciones);
router.put('/notificaciones/:id',updateNotificacion);
router.get('/notificaciones/:id',getByid)

module.exports=router;