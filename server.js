// server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const db = require('./config/db');  // Esto es correcto si 'server.js' está en la raíz y 'db.js' en 'config'
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);

// Conexión a la base de datos (asegúrate de que esté correctamente configurado en tu db.js)
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Detener la aplicación si no se puede conectar
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Manejador de errores generales para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejador de errores generales
app.use((err, req, res, next) => {
  console.error('Error del servidor:', err);
  res.status(500).json({ message: 'Algo salió mal en el servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
