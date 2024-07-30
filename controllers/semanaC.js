const Semana = require('../models/semana');

const createOrUpdateSemana = async (req, res) => {
    try {
        const { 
            lunes,
            martes,
            miercoles,
            jueves,
            viernes,
            sabado,
            domingo
        } = req.body;

        const updateData = {
            lunes,
            martes,
            miercoles,
            jueves,
            viernes,
            sabado,
            domingo
        };

        // Intentar encontrar el documento de semana existente
        let semana = await Semana.findOne({});

        if (!semana) {
            // Si no existe, crear uno nuevo
            semana = new Semana(updateData);
            await semana.save();
            return res.status(201).json({ message: 'Semana creada exitosamente' });
        } else {
            // Si existe, actualizarlo
            await Semana.updateOne({}, updateData);
            return res.status(200).json({ message: 'Semana actualizada exitosamente' });
        }
    } catch (error) {
        console.error('Error al crear o actualizar semana:', error);
        return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
    }
};


const getSemana = async (req, res) => {
    try {
        const semana = await Semana.findOne({});
        if (!semana) {
            return res.status(404).json({ message: 'Semana no encontrada' });
        }
        return res.json(semana);
    } catch (error) {
        console.error('Error al obtener semana:', error);
        return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
    }
};

module.exports = {
    createOrUpdateSemana,
    getSemana
};
