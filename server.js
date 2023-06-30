const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./usersController');
const hobbiesController = require('./hobbiesController');
const { Pool } = require('pg');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_dashboard',
  password: 'root',
  port: 5432,
});

// Middleware para agregar el objeto 'pool' a la solicitud
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Crear el servidor HTTP
const server = http.createServer(app);

// Configurar Socket.IO
const io = socketIO(server);

// Configurar evento de conexión
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Manejar evento de desconexión
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Ruta para obtener una lista de usuarios
app.get('/api/users', usersController.getUsers);

// Ruta para obtener un usuario específico
app.get('/api/users/:id', usersController.getUserById);

// Ruta para crear un nuevo usuario
app.post('/api/users', usersController.createUser);

// Ruta para actualizar un usuario existente
app.put('/api/users/:id', usersController.updateUser);

// Ruta para eliminar un usuario
app.delete('/api/users/:id', usersController.deleteUser);

// Ruta para obtener los hobbies de un usuario específico
app.get('/api/users/:id/hobbies', hobbiesController.getHobbiesByUserId);

// Ruta para agregar un nuevo hobby a un usuario
app.post('/api/users/:id/hobbies', hobbiesController.addHobbyToUser);

// Ruta para eliminar un hobby de un usuario
app.delete('/api/users/:id/hobbies/:hobbyId', hobbiesController.removeHobbyFromUser);

// Iniciar el servidor HTTP
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});