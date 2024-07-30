let responsesClientes = [];

app.get("/agenda/ver", async (req, res) => {
  try {
    const notificaciones = await Agenda.find();
    res.status(200).json({
      notificaciones,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las notificaciones",
    });
  }
  console.log("Hola")
});

//ObtenerLong
app.get("/agenda/nueva-agenda", (req, res) => {
  responsesClientes.push(res);
  console.log(res);
});

function responderClientes(notificacion) {
  for (res of responsesClientes) {
    res.status(200).json({
      success: true,
      notificacion,
    });
  }

  responsesClientes = [];
}

//Guardar
app.post("/agenda/guardar", async (req, res) => {
  try {
    const notificacion = new Agenda({
      fecha: req.body.fecha,
      usuario: req.body.usuario,
      mensaje: req.body.mensaje,
    });
    await notificacion.save();

    responderClientes(notificacion);

    return res.status(201).json({
      success: true,
      message: "evento guardada",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al guardar el evento",
    });
  }
  console.clear()
});

app.delete('/agenda', async (req, res) => {
  try {
    await Agenda.deleteMany();
    res.status(200).json({ message: 'Todos los eventos han sido eliminadas' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar los eventos' });
  }
});