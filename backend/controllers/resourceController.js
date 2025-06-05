const db = require('../config/db'); // Asegúrate de que la conexión a la DB esté bien configurada

// Agregar un recurso
exports.addResource = (req, res) => {
  const { nombre, descripcion, categoria_id, usuario_id } = req.body;

  // Query para insertar un nuevo recurso
  const query = 'INSERT INTO recursos (nombre, descripcion, categoria_id, usuario_id) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, descripcion, categoria_id, usuario_id], (err, results) => {
    if (err) {
      console.error('Error al agregar el recurso:', err);
      return res.status(500).json({ error: 'Error al agregar el recurso' });
    }

    res.status(201).json({ message: 'Recurso agregado correctamente' });
  });
};

// Obtener recursos
exports.getResources = (req, res) => {
  const query = `
    SELECT r.id, r.nombre, r.descripcion, c.nombre AS categoria, u.username AS usuario 
    FROM recursos r
    JOIN categorias c ON r.categoria_id = c.id
    JOIN usuarios u ON r.usuario_id = u.id
  `;

  // Query para obtener los recursos
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los recursos:', err);
      return res.status(500).json({ error: 'Error al obtener los recursos' });
    }

    res.status(200).json(results);
  });
};
