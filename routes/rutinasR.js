const express = require('express');
const {createRutina,getRutina}=require('../controllers/rutinaC')

const router = express.Router();


router.post('/rutina', createRutina);
router.get('/rutina', getRutina);

module.exports=router;