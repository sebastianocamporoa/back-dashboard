const getUsers = (req, res) => {
    const pool = req.pool;
  
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
      } else {
        res.json(results.rows);
      }
    });
  };
  
  const getUserById = (req, res) => {
    const { id } = req.params;
    const pool = req.pool;
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
      } else if (results.rows.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        res.json(results.rows[0]);
      }
    });
  };
  
  const createUser = (req, res) => {
    const { name, email } = req.body;
    const pool = req.pool;
  
    pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email],
      (error, results) => {
        if (error) {
          console.error('Error al crear el usuario:', error);
          res.status(500).json({ error: 'Error al crear el usuario' });
        } else {
          const newUser = results.rows[0];
          req.app.get('io').emit('userCreated', newUser);
          res.status(201).json(newUser);
        }
      }
    );
  };
  
  const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const pool = req.pool;
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id],
      (error, results) => {
        if (error) {
          console.error('Error al actualizar el usuario:', error);
          res.status(500).json({ error: 'Error al actualizar el usuario' });
        } else if (results.rows.length === 0) {
          res.status(404).json({ error: 'Usuario no encontrado' });
        } else {
          const updatedUser = results.rows[0];
          req.app.get('io').emit('userUpdated', updatedUser);
          res.json(updatedUser);
        }
      }
    );
  };
  
  const deleteUser = (req, res) => {
    const { id } = req.params;
    const pool = req.pool;
  
    pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id], (error, results) => {
      if (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
      } else if (results.rows.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        req.app.get('io').emit('userDeleted', id);
        res.json({ message: 'Usuario eliminado correctamente' });
      }
    });
  };
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };