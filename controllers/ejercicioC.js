const ejercicioSchema = require('../models/ejercicioM');

const createEjercicio = async (req, res) => {
    try {
        const { titulo, cuerpo, descripcion } = req.body;
        if (!titulo) {
            return res.status(400).json({ message: 'El título es un campo obligatorio' });
        }
        const ejercicio = new ejercicioSchema({
            titulo,
            cuerpo,
            descripcion
        });
        await ejercicio.save();
        return res.status(201).json({ message: 'Éxito al crear ejercicio' });

    } catch (error) {
        console.error('Error al crear el ejercicio:', error);
        return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
    }
};

const getEjercicios = (req, res) => {
    ejercicioSchema
        .find({})
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

const getEjercicioByTitulo = (req, res) => {
    const titulo = req.params.titulo; // Obtener el título desde los parámetros de la ruta
    ejercicioSchema
        .findOne({ titulo })
        .then((ejercicio) => {
            if (!ejercicio) {
                return res.status(404).json({ message: 'Ejercicio no encontrado' });
            }
            res.json(ejercicio);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
};

module.exports = {
    createEjercicio,
    getEjercicios,
    getEjercicioByTitulo,
};
