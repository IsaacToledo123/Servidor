const notificacionRespuestaSchema = require('../models/notificacionRespuesta');

let responsesClientes = [];

const createNotificacion = async (req, res) => {
    try {
        const { hora, descripcion, status, idNotificacion } = req.body;
        if (!descripcion) {
            return res.status(400).json({ message: 'La descripción es un campo obligatorio' });
        }
        const nuevaNotificacion = new notificacionRespuestaSchema({
            hora,
            descripcion,
            status,
            idNotificacion
        });
        await nuevaNotificacion.save();
        
        // Responder a clientes pendientes
        responderClientes(nuevaNotificacion);

        return res.status(201).json({ message: 'Notificación creada con éxito' });
    } catch (error) {
        console.error('Error al crear la notificación:', error);
        return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
    }
};

const getByid = async (req, res) => {
    try {
        const descripcion = req.params.descripcion;
        const notificacion = await notificacionRespuestaSchema.find({ descripcion: descripcion });
        if (notificacion.length === 0) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }
        res.json(notificacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNotificaciones = (req, res) => {
    notificacionRespuestaSchema
        .find({})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
};

const addClienteResponse = (req,res) => {
  responsesClientes.push(res);
};

// Responder a todos los clientes pendientes con la notificación proporcionada
const responderClientes = (notificacion) => {
    for (let i = 0; i < responsesClientes.length; i++) {
      responsesClientes[i].status(201).json(notificacion);
    }
    responsesClientes = []; 
};

module.exports = {
    getNotificaciones,
    getByid,
    createNotificacion,
    addClienteResponse, // Exportar función para agregar respuesta de cliente
};
