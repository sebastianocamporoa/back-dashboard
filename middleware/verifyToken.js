const jwt = require("jsonwebtoken");

// Middleware para verificar el token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token de autenticación no proporcionado" });
  }

  try {
    const secretKey = "sebastian_ocampo_roa";
    const decoded = jwt.verify(token, secretKey);

    // Verificar si el token está próximo a vencer
    const expirationTime = decoded.exp - Date.now() / 1000;
    const oneMinute = 60;

    if (expirationTime < oneMinute) {
      // Generar un nuevo token
      const newToken = generateAuthToken(decoded.userId);
      res.setHeader("Authorization", newToken);
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(401).json({ message: "Token de autenticación inválido" });
  }
}

// Función auxiliar para generar un token de autenticación
function generateAuthToken(userId) {
  const secretKey = "sebastian_ocampo_roa";
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "10m" });
  return token;
}

module.exports = verifyToken;