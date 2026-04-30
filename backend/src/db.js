
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createSchema = async () => {
  const schema = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50) DEFAULT 'todo', -- 'todo', 'in_progress', 'done'
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;
  try {
    await pool.query(schema);
    console.log('Schema created successfully.');
  } catch (err) {
    console.error('Error creating schema:', err);
  }
};

// createSchema(); // Uncomment to run schema creation

module.exports = {
  query: (text, params) => pool.query(text, params),
  createSchema,
};
