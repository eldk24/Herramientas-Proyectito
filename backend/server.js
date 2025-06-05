const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000; // Usa el mismo puerto que estás probando en Postman

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas reales conectadas a MySQL
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
