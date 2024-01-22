const { getUsuarios, postUsuario, updateUsuario } = require('../controllers/clientesController');
const express = require('express')

const router = express.Router();

router.post('/usuario', postUsuario);

router.get('/usuario', getUsuarios);

router.put('/update-usuario/:id', updateUsuario);



module.exports = router;
