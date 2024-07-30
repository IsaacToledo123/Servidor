const usuarioSchema = require('../models/clientes');


const getUsuarios = (req, res) => {
    usuarioSchema.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((error)=> res.json({massage:error}))
}
const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await usuarioSchema.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    if (password !== usuario.contraseña) {
  
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.status(200).json({ message: 'Login exitoso', usuario });

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error en el login' });
  }
};

const postUsuario = async (req, res) => {

    try {
  
      const { nombre,contraseña, email ,sexo,objetivos,plan} = req.body;
  
      const nuevoUsuario = new usuarioSchema({
  
        nombre,
        contraseña,
        email,
        sexo,
        objetivos,
        plan
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

  const getAllUsuarios = async (req, res) => {
    try {
      const clientes = await usuarioSchema.find();
      res.status(200).json(clientes);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      res.status(500).json({ error: 'Error al obtener los clientes' });
    }
  };


  module.exports={
    getAllUsuarios,
    updateUsuario,
    postUsuario,
    getUsuarios,
    loginUsuario
  }