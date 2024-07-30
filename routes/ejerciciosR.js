const {createEjercicio,getEjercicios,getEjercicioByTitulo}=require('../controllers/ejercicioC')
const express = require('express');

const router=express.Router();


router.post('/ejercicio', createEjercicio);
router.get('/ejercicio', getEjercicios);
router.get('/ejercicio/:titulo', getEjercicioByTitulo);


module.exports=router;