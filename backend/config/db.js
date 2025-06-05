<<<<<<< HEAD
const mysql = require('mysql');

// Crea solo la conexión, pero NO llames a .connect()
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'recursosdb'
});

// Solo exportas la conexión
=======
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión a la base de datos:', err);
  } else {
    console.log('✅ Conexión a la base de datos establecida');
  }
});

>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
module.exports = connection;
