import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // MUST match .env exactly
  database: process.env.DB_NAME
});

// Use the promise wrapper
export default pool.promise();
