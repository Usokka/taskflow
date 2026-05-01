
const db = require('../db');

const ALLOWED_STATUSES = new Set(['todo', 'in_progress', 'done']);

const isValidStatus = (status) => ALLOWED_STATUSES.has(status);

const getAllTasks = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTask = async (req, res) => {
  const { title, description, status } = req.body || {};

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required.' });
  }

  if (status && !isValidStatus(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  try {
    const { rows } = await db.query(
      `INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *`,
      [title.trim(), description || null, status || 'todo']
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body || {};

  if (!title && !description && !status) {
    return res.status(400).json({ error: 'At least one field is required to update.' });
  }

  if (status && !isValidStatus(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  try {
    const { rows } = await db.query(
      `UPDATE tasks SET
         title = COALESCE($1, title),
         description = COALESCE($2, description),
         status = COALESCE($3, status),
         updated_at = NOW()
       WHERE id = $4 RETURNING *`,
      [title ? title.trim() : null, description || null, status || null, id]
    );

    if (!rows[0]) return res.status(404).json({ error: 'Task not found.' });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    if (!rows[0]) return res.status(404).json({ error: 'Task not found.' });
    res.status(200).json({ message: 'Task deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
