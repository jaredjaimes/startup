const express = require('express');
const uuid = require('uuid');
const cors = require('cors');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

// Middleware
app.use(express.json());
app.use(cors());

// In- memory storageok, wha
let users = {};
let skills = [];
let tasks = [];
let scores = [];

// Avatar Endpoints
app.get('*', (_req, res) => {
  res.send({ msg: 'Simon service' });
});

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
