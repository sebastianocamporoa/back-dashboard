const jwt = require("jsonwebtoken");

const getUsers = (req, res) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization;

  // Verificar si el token está presente y válido
  if (!token) {
    return res
      .status(401)
      .json({ error: "Token de autenticación no proporcionado" });
  }

  try {
    // Verificar y decodificar el token
    const secretKey = "sebastian_ocampo_roa";
    const decoded = jwt.verify(token, secretKey);

    // Obtener el ID de usuario del token decodificado
    const userId = decoded.userId;

    // Si el token está próximo a vencer en 1 minuto o menos, generar uno nuevo y enviarlo en el encabezado de la respuesta
    const expirationTime = decoded.exp - Date.now() / 1000;
    const oneMinute = 60;

    if (expirationTime <= oneMinute) {
      const newToken = generateAuthToken(userId);
      res.setHeader("Authorization", newToken);
    }

    const pool = req.pool;

    pool.query("SELECT * FROM users", (error, results) => {
      if (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ error: "Error al obtener los usuarios" });
      } else {
        const users = results.rows;

        // Agregar el token a cada usuario en la respuesta
        const usersWithToken = users.map((user) => {
          return { ...user, token };
        });

        res.json(usersWithToken);
      }
    });
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ error: "Token de autenticación inválido" });
  }
};

const getUserById = (req, res) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization;

  // Verificar si el token está presente y válido
  if (!token) {
    return res
      .status(401)
      .json({ error: "Token de autenticación no proporcionado" });
  }

  try {
    // Verificar y decodificar el token
    const secretKey = "sebastian_ocampo_roa";
    const decoded = jwt.verify(token, secretKey);

    // Obtener el ID de usuario del token decodificado
    const userId = decoded.userId;

    // Si el token está próximo a vencer en 1 minuto o menos, generar uno nuevo y enviarlo en el encabezado de la respuesta
    const expirationTime = decoded.exp - Date.now() / 1000;
    const oneMinute = 60;

    if (expirationTime <= oneMinute) {
      const newToken = generateAuthToken(userId);
      res.setHeader("Authorization", newToken);
    }

    const { id } = req.params;
    const pool = req.pool;

    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).json({ error: "Error al obtener el usuario" });
      } else if (results.rows.length === 0) {
        res.status(404).json({ error: "Usuario no encontrado" });
      } else {
        res.json(results.rows[0]);
      }
    });
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ error: "Token de autenticación inválido" });
  }
};

const createUser = (req, res) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization;

  // Verificar si el token está presente y válido
  if (!token) {
    return res
      .status(401)
      .json({ error: "Token de autenticación no proporcionado" });
  }

  try {
    // Verificar y decodificar el token
    const secretKey = "sebastian_ocampo_roa";
    const decoded = jwt.verify(token, secretKey);

    // Obtener el ID de usuario del token decodificado
    const userId = decoded.userId;

    // Si el token está próximo a vencer en 1 minuto o menos, generar uno nuevo y enviarlo en el encabezado de la respuesta
    const expirationTime = decoded.exp - Date.now() / 1000;
    const oneMinute = 60;

    if (expirationTime <= oneMinute) {
      const newToken = generateAuthToken(userId);
      res.setHeader("Authorization", newToken);
    }

    const { name, email } = req.body;
    const pool = req.pool;

    pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
      (error, results) => {
        if (error) {
          console.error("Error al crear el usuario:", error);
          res.status(500).json({ error: "Error al crear el usuario" });
        } else {
          req.app.get("io").emit("userCreated", results.rows[0]);
          res.json(results.rows[0]);
        }
      }
    );
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ error: "Token de autenticación inválido" });
  }
};

const updateUser = (req, res) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization;

  // Verificar si el token está presente y válido
  if (!token) {
    return res
      .status(401)
      .json({ error: "Token de autenticación no proporcionado" });
  }

  try {
    // Verificar y decodificar el token
    const secretKey = "sebastian_ocampo_roa";
    const decoded = jwt.verify(token, secretKey);

    // Obtener el ID de usuario del token decodificado
    const userId = decoded.userId;

    // Si el token está próximo a vencer en 1 minuto o menos, generar uno nuevo y enviarlo en el encabezado de la respuesta
    const expirationTime = decoded.exp - Date.now() / 1000;
    const oneMinute = 60;

    if (expirationTime <= oneMinute) {
      const newToken = generateAuthToken(userId);
      res.setHeader("Authorization", newToken);
    }

    const { id } = req.params;
    const { name, email } = req.body;
    const pool = req.pool;

    pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id],
      (error, results) => {
        if (error) {
          console.error("Error al actualizar el usuario:", error);
          res.status(500).json({ error: "Error al actualizar el usuario" });
        } else if (results.rows.length === 0) {
          res.status(404).json({ error: "Usuario no encontrado" });
        } else {
          const updatedUser = results.rows[0];
          req.app.get("io").emit("userUpdated", updatedUser);
          res.json(updatedUser);
        }
      }
    );
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ error: "Token de autenticación inválido" });
  }
};

const deleteUser = (req, res) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization;

  // Verificar si el token está presente y válido
  if (!token) {
    return res
      .status(401)
      .json({ error: "Token de autenticación no proporcionado" });
  }

  try {
    // Verificar y decodificar el token
    const secretKey = "sebastian_ocampo_roa";
    const decoded = jwt.verify(token, secretKey);

    // Obtener el ID de usuario del token decodificado
    const userId = decoded.userId;

    // Si el token está próximo a vencer en 1 minuto o menos, generar uno nuevo y enviarlo en el encabezado de la respuesta
    const expirationTime = decoded.exp - Date.now() / 1000;
    const oneMinute = 60;

    if (expirationTime <= oneMinute) {
      const newToken = generateAuthToken(userId);
      res.setHeader("Authorization", newToken);
    }

    const { id } = req.params;
    const pool = req.pool;

    pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id],
      (error, results) => {
        if (error) {
          console.error("Error al eliminar el usuario:", error);
          res.status(500).json({ error: "Error al eliminar el usuario" });
        } else if (results.rows.length === 0) {
          res.status(404).json({ error: "Usuario no encontrado" });
        } else {
          const deletedUser = results.rows[0];
          req.app.get("io").emit("userDeleted", deletedUser);
          res.json(deletedUser);
        }
      }
    );
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ error: "Token de autenticación inválido" });
  }
};

// Generar un nuevo token de autenticación con el ID de usuario proporcionado
const generateAuthToken = (userId) => {
  const secretKey = "sebastian_ocampo_roa";
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
  return token;
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
