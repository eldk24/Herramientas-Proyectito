const bcrypt = require('bcrypt');
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
};
