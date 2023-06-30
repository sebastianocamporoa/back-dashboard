// Obtener los hobbies de un usuario específico
async function getHobbiesByUserId(req, res) {
  const userId = req.params.id;
  const pool = req.pool;

  try {
    const query = "SELECT * FROM hobbies WHERE user_id = $1";
    const values = [userId];
    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los hobbies del usuario" });
  }
}

// Agregar un nuevo hobby a un usuario
async function addHobbyToUser(req, res) {
  const userId = req.params.id;
  const { name } = req.body;
  const pool = req.pool;

  try {
    const query =
      "INSERT INTO hobbies (user_id, name) VALUES ($1, $2) RETURNING *";
    const values = [userId, name];
    const result = await pool.query(query, values);

    // Enviar actualización en tiempo real a los clientes conectados
    const newHobby = result.rows[0];
    req.app.get("io").emit("hobbyAdded", newHobby);

    res.status(201).json(newHobby);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el hobby al usuario" });
  }
}

// Eliminar un hobby de un usuario
async function removeHobbyFromUser(req, res) {
  const userId = req.params.id;
  const hobbyId = req.params.hobbyId;
  const pool = req.pool;

  try {
    const query = "DELETE FROM hobbies WHERE user_id = $1 AND id = $2";
    const values = [userId, hobbyId];
    await pool.query(query, values);

    // Enviar actualización en tiempo real a los clientes conectados
    req.app.get("io").emit("hobbyRemoved", hobbyId);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el hobby del usuario" });
  }
}

module.exports = {
  getHobbiesByUserId,
  addHobbyToUser,
  removeHobbyFromUser,
};
