const notificacionesSchema = require('../models/notificaciones')


const getNotificaciones=(req ,res)=>{
    notificacionesSchema
    .find({})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error}))
}

const createNotificacion = async (req, res) => {
  try {
    const { descripcion ,status} = req.body;
    if (!descripcion) {
      return res.status(400).json({ message: 'La descripción es un campo obligatorio' });
    }
    const nuevaNotificacion = new notificacionesSchema({
      hora: new Date(), 
      descripcion,
      status
    });
    await nuevaNotificacion.save();
    return res.status(201).json({ message: 'Notificación creada con éxito' });
  } catch (error) {
    console.error('Error al crear la notificación:', error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
};


const updateNotificacion = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID de notificación inválido' });
    }

  
    const notificacion = await notificacionesSchema.findByIdAndUpdate(id, {
      status
    }, { new: true }); // El parámetro { new: true } devuelve el documento actualizado

    if (!notificacion) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }

    return res.status(200).json({ message: 'Notificación actualizada con éxito', data: notificacion });
  } catch (error) {
    console.error('Error al actualizar la notificación:', error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
};
const getByid = async (req, res) => {
  try {
    const { id } = req.params;
    const notificacion = await notificacionesSchema.findById(id);
    if (!notificacion) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }
    res.json(notificacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotificaciones,
  createNotificacion,
  updateNotificacion,
  getByid
};
