
const db = require('../db');

const getAllTasks = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTasks,
};
