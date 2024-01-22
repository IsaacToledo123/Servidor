const notificacionesSchema = require('../models/notificaciones')


const getNotificaciones=(req ,res)=>{
    notificacionesSchema
    .find({})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error}))
}

const createNotificacion = async (req, res) => {
  try {
    const { descripcion } = req.body;
    if (!descripcion) {
      return res.status(400).json({ message: 'La descripción es un campo obligatorio' });
    }
    const nuevaNotificacion = new notificacionesSchema({
      hora: new Date(), 
      descripcion,
    });
    await nuevaNotificacion.save();
    return res.status(201).json({ message: 'Notificación creada con éxito' });
  } catch (error) {
    console.error('Error al crear la notificación:', error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
};

  
  module.exports = {
    getNotificaciones,
    createNotificacion,
  };