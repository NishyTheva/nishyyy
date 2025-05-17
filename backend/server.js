const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Temporary database file
const USERS_DB = './users.json';

// Initialize empty user database if not exists
if (!fs.existsSync(USERS_DB)) {
  fs.writeFileSync(USERS_DB, JSON.stringify([]));
}

// API: Register user
app.post('/register', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username required' });
  }

  let users = JSON.parse(fs.readFileSync(USERS_DB));
  const exists = users.find((u) => u.username === username);
  if (exists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  users.push({ username });
  fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2));
  res.json({ message: 'User registered successfully' });
});

// API: Get all users
app.get('/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(USERS_DB));
  res.json(users);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
