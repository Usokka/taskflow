
const app = require('./app');
const db = require('./db');

const PORT = process.env.PORT || 3001;

// Ensure DB schema exists (best-effort). Errors are logged but won't prevent server start.
db.createSchema().catch((err) => {
  console.error('Failed to create DB schema on startup:', err.message || err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
