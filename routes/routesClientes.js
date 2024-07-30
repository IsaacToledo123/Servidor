const { getUsuarios, postUsuario, updateUsuario,loginUsuario, getAllUsuarios } = require('../controllers/clientesController');
const express = require('express')

const router = express.Router();

router.post('/usuario', postUsuario);
router.post('/login', loginUsuario);


router.get('/usuario', getAllUsuarios);

router.put('/update-usuario/:id', updateUsuario);



module.exports = router;
