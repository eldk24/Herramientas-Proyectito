const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let users = [];  // Usaremos un arreglo temporal por ahora para almacenar los usuarios.

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Guardar al usuario en el arreglo (simulando base de datos)
  users.push({ name, email, password });

  res.status(201).json({ message: 'Usuario registrado correctamente' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Verificar si el usuario existe
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    return res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } else {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
