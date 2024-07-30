const rutiSchema = require('../models/rutinaM')

const createRutina = async (req, res) => {
    try {
        const {titulo, ejercicio1 ,repeticiones1, ejercicio2,repeticiones2, ejercicio3,repeticiones3, ejercicio4,repeticiones4,ejercicio5,repeticiones5 } = req.body
        if (!titulo) {
            return res.status(400).json({ message: 'El cuerpo es un campo obligatorio' });
        }
        const rutina = new rutiSchema({
            
           titulo, ejercicio1, ejercicio2, ejercicio3, ejercicio4, ejercicio5,repeticiones1,repeticiones2,repeticiones3,repeticiones4,repeticiones5
        })
        await rutina.save()
        return res.status(201).json({ message: 'Exito al crear rutina' })


    } catch (error) {
        console.error('Error al crear rutina:', error);
        return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
    }
}
const getRutina = (req, res) => {
    rutiSchema
        .find({})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
};

module.exports={
 createRutina,
 getRutina
  }