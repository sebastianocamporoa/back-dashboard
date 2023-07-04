// Obtener los hobbies de un usuario específico
async function getHobbiesByUserId(req, res) {
  const userId = req.params.id;
  const pool = req.pool;

  try {
    const query = "SELECT * FROM hobbies WHERE userid = $1";
    const values = [userId];
    const result = await pool.query(query, values);
    console.log(result);

    res.json(result.rows);
  } catch (error) {
    console.error(error); // Mostrar el error en la consola
    res.status(500).json({ error: "Error al obtener los hobbies del usuario" });
  }
}

// Agregar un nuevo hobby a un usuario
async function addHobbyToUser(req, res) {
  const userId = parseInt(req.params.id);
  const { hobby } = req.body;
  const pool = req.pool;

  try {
    const query =
      "INSERT INTO hobbies (userid, hobby) VALUES ($1, $2) RETURNING *";
    const values = [userId, hobby];
    const result = await pool.query(query, values);

    const newHobby = result.rows[0];
    req.io.emit("hobbyAdded", newHobby);

    res.status(201).json(newHobby);
  } catch (error) {
    console.error(error); // Mostrar el error en la consola
    res.status(500).json({ error: "Error al agregar el hobby al usuario" });
  }
}

// Eliminar un hobby de un usuario
async function removeHobbyFromUser(req, res) {
  const userId = req.params.id;
  const hobbyId = req.params.hobbyId;
  const pool = req.pool;

  try {
    const query = "DELETE FROM hobbies WHERE userid = $1 AND id = $2";
    const values = [userId, hobbyId];
    await pool.query(query, values);

    req.io.emit("hobbyRemoved", hobbyId);

    res.sendStatus(204);
  } catch (error) {
    console.error(error); // Mostrar el error en la consola
    res.status(500).json({ error: "Error al eliminar el hobby del usuario" });
  }
}

// Actualizar un hobby de un usuario
async function updateHobby(req, res) {
  const userId = req.params.id;
  const hobbyId = req.params.hobbyId;
  const { hobby } = req.body;
  const pool = req.pool;

  try {
    const query =
      "UPDATE hobbies SET hobby = $1 WHERE userid = $2 AND id = $3 RETURNING *";
    const values = [hobby, userId, hobbyId];
    const result = await pool.query(query, values);

    const updatedHobby = result.rows[0];
    req.io.emit("hobbyUpdated", updatedHobby);

    res.json(updatedHobby);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el hobby del usuario" });
  }
}

module.exports = {
  getHobbiesByUserId,
  addHobbyToUser,
  removeHobbyFromUser,
  updateHobby,
};
