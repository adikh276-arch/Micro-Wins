import express from 'express';
import cors from 'cors';
import { pool } from './src/lib/db.js';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

// Run Schema
const runSchema = async () => {
  try {
    console.log('Running Schema...');
    const schemaSql = fs.readFileSync(path.join(process.cwd(), 'database', 'schema.sql'), 'utf-8');
    await pool.query(schemaSql);
    console.log('Schema created successfully');
    
    // DB Validation (create/read/delete test)
    console.log('Validating DB Connection...');
    await pool.query('SELECT NOW()');
    console.log('Neon Database Reachable 🟢');
    
    await pool.query('BEGIN');
    await pool.query('INSERT INTO users (id) VALUES ($1) ON CONFLICT DO NOTHING', [99999999]);
    await pool.query('DELETE FROM users WHERE id = $1', [99999999]);
    await pool.query('COMMIT');
    console.log('Validation successful 🟢');

  } catch (err) {
    console.error('Error with schema/validation', err);
    await pool.query('ROLLBACK');
    process.exit(1);
  }
};

runSchema();

// User Initialization
app.post('/api/users', async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ error: 'Missing user_id' });
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);
    if (result.rows.length === 0) {
      await pool.query('INSERT INTO users (id) VALUES ($1)', [user_id]);
    }
    res.json({ success: true });
  } catch (err) {
    console.error('User initialization error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Wins API
app.get('/api/wins', async (req, res) => {
  const user_id = req.query.user_id;
  if (!user_id) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const result = await pool.query('SELECT * FROM micro_wins WHERE user_id = $1 ORDER BY date DESC', [user_id]);
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch wins error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/wins', async (req, res) => {
  const { id, user_id, win, reflection, date } = req.body;
  if (!user_id) return res.status(401).json({ error: 'Unauthorized' });
  try {
    await pool.query(
      'INSERT INTO micro_wins (id, user_id, win, reflection, date, created_at) VALUES ($1, $2, $3, $4, $5, NOW())',
      [id, user_id, win, reflection, date]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Insert win error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
