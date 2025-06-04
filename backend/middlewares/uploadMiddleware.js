const multer = require('multer');
const path = require('path');

// Configurar almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se suben los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ejemplo: 1712345123.pdf
  },
});

// Filtros opcionales (PDF, imágenes, videos)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|jpg|jpeg|png|mp4|avi/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos PDF, imágenes o videos.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

// backend/middlewares/authMiddleware.js

function authMiddleware(req, res, next) {
    // Simulación: permitir acceso sin validación real
    console.log("Middleware de autenticación ejecutado");
    next();
  }
  
  module.exports = authMiddleware;
  

module.exports = upload;
