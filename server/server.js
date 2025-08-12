import express from 'express';
import dotenv from 'dotenv';
import pool from './config/db.js';

dotenv.config();
console.log("📂 dotenv loaded from:", process.env.PWD || process.cwd());
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD || "(empty)");


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

async function startServer() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('✅ MySQL connected! Test result:', rows[0].result);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MySQL:', err.message);
    process.exit(1);
  }
}

startServer();
