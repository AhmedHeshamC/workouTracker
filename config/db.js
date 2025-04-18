const mysql = require('mysql2/promise');
require('dotenv').config(); // Load environment variables

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Optional: Test connection
pool.getConnection()
  .then(connection => {
    console.log('MySQL Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1); // Exit if DB connection fails
  });

module.exports = pool;
