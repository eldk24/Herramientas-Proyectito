const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController'); // Ruta al controlador

// Ruta para agregar un recurso
router.post('/add', resourceController.addResource);

// Ruta para obtener los recursos
router.get('/', resourceController.getResources);

module.exports = router;
