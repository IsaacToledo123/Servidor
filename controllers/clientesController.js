const usuarioSchema = require('../models/clientes');


const getUsuarios = (req, res) => {
    usuarioSchema.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((error)=> res.json({massage:error}))
}
const postUsuario = async (req, res) => {

    try {
  
      const { nombre, email } = req.body;
  
      const nuevoUsuario = new usuarioSchema({
  
        nombre,
        email
  
      });
  
      const usuarioGuardado = await nuevoUsuario.save();
  
      res.status(201).json(usuarioGuardado);
  
    } catch (error) {
  
      console.error('Error al crear el usuario:', error);
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
  
  };
  
const updateUsuario = async (req, res) => {

    try {
      const userId = req.params.id;
      const { nombre, email } = req.body;
  
      const usuario = await usuarioSchema.findById(userId);
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
  
      usuario.nombre = nombre;
      usuario.email = email;
  
      await usuario.save();
  
      res.status(200).json({ usuario });
  
    } catch (error) {
  
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
  
    }
  };
  module.exports={
    updateUsuario,
    postUsuario,
    getUsuarios
  }