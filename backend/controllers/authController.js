const bcrypt = require('bcrypt');
<<<<<<< HEAD
const db = require('../config/db');  // Conexión a la base de datos

// controllers/authController.js
exports.register = (req, res) => {
    // Tu lógica de registro
    res.send('Usuario registrado');
  };
  
  exports.login = (req, res) => {
    // Tu lógica de login
    res.send('Login exitoso');
  };
  

exports.register = (req, res) => {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    db.query('SELECT * FROM usuarios WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // Encriptar la contraseña
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error al encriptar la contraseña:', err);
                return res.status(500).json({ error: 'Error al encriptar la contraseña' });
            }

            const query = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
            db.query(query, [username, hashedPassword], (error, results) => {
                if (error) {
                    console.error('Error al registrar el usuario:', error);
                    return res.status(500).json({ error: 'Error al registrar el usuario' });
                }

                res.status(201).json({ message: 'Usuario registrado correctamente' });
            });
        });
    });
=======
const db = require('../config/db');

// Registro de usuario
exports.register = (req, res) => {
  const { name, email, password, role } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error al encriptar la contraseña:', err);
        return res.status(500).json({ error: 'Error al encriptar la contraseña' });
      }

      const query = 'INSERT INTO usuarios (name, email, password, role) VALUES (?, ?, ?, ?)';
      db.query(query, [name, email, hashedPassword, role], (error) => {
        if (error) {
          console.error('Error al registrar el usuario:', error);
          return res.status(500).json({ error: 'Error al registrar el usuario' });
        }

        res.status(201).json({ message: 'Usuario registrado correctamente' });
      });
    });
  });
};

// Inicio de sesión
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar contraseñas:', err);
        return res.status(500).json({ error: 'Error al comparar contraseñas' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      res.status(200).json({
        message: 'Login exitoso',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    });
  });
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
};
