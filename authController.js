const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Función para iniciar sesión
async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Verifica si el usuario existe en la base de datos
    const user = await getUserByUsername(username);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Nombre de usuario o contraseña incorrectos" });
    }

    // Comprueba la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Nombre de usuario o contraseña incorrectos" });
    }

    // Si las credenciales son válidas, genera un token de autenticación
    const token = generateAuthToken(user.id);

    // Envía el token al cliente
    res.json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
}

// Función para registrar un nuevo usuario
async function register(req, res) {
  try {
    const {
      username,
      password,
      email,
      phone_number,
      first_name,
      last_name,
      document_number,
      birthdate,
      expedition_date,
      document_type,
    } = req.body;

    // Verifica si el usuario ya existe en la base de datos
    const existingUser = await getUserByUsername(req, username);
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "El nombre de usuario ya está en uso" });
    }

    // Genera una contraseña hash utilizando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Almacena el nombre de usuario y la contraseña hash en la base de datos
    const query =
      "INSERT INTO users (username, password, email, phone_number, first_name, last_name, document_number, birthdate, expedition_date, document_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
    const values = [
      username,
      hashedPassword,
      email,
      phone_number,
      first_name,
      last_name,
      document_number,
      birthdate,
      expedition_date,
      document_type,
    ];
    await req.pool.query(query, values);

    // Envía una respuesta de éxito al cliente
    res.json({ message: "Registro exitoso" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
}

// Función auxiliar para obtener un usuario por nombre de usuario desde la base de datos
async function getUserByUsername(req, username) {
  try {
    const query = "SELECT * FROM users WHERE username = $1";
    const values = [username];
    const result = await req.pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener el usuario por nombre de usuario:", error);
    throw error;
  }
}

// Función auxiliar para generar un token de autenticación
function generateAuthToken(userId) {
  const secretKey = "sebastian_ocampo_roa";
  const token = jwt.sign({ userId }, secretKey);
  return token;
}

module.exports = {
  login,
  register,
};
