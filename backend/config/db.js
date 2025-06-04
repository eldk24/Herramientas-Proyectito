const mysql = require('mysql');

// Crea solo la conexión, pero NO llames a .connect()
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'recursosdb'
});

// Solo exportas la conexión
module.exports = connection;
