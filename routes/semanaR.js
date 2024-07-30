const {createOrUpdateSemana,getSemana}=require('../controllers/semanaC')
const express = require('express');

const router=express.Router();


router.post('/semana', createOrUpdateSemana);
router.get('/semana', getSemana);

module.exports=router;