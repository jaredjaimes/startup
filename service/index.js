const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;


// In- memory storageok, wha
let users = {};

// Middleware
// You do this because all of our endpoints use JSON and so we want Express to automatically parse that for us.
app.use(express.json());

// Serves up front-end static content hosting.
//  The React app and backend are hosted on the same server, simplifying deployment and allowing seamless integration between the frontend and backend.
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//Login Logic
// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    const user = users[req.body.email];
    if (user) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
      users[user.email] = user;
  
      res.send({ token: user.token });
    }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = users[req.body.email];
    if (user) {
      if (req.body.password === user.password) {
        user.token = uuid.v4();
        res.send({ token: user.token });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
      delete user.token;
    }
    res.status(204).end();
});
  
// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


//-----------------------------------------------

// //Skills logic:
// // Update Skills and Tasks for a User
// apiRouter.post('/skills/:username', (req, res) => {
//   const { username } = req.params;
//   const { skills, tasks } = req.body;

//   if (!users[username]) {
//     users[username] = { skills: [], tasks: [] };
//   }

//   users[username].skills = skills || users[username].skills;
//   users[username].tasks = tasks || users[username].tasks;

//   res.status(200).send(users[username]);
// });

// //Rankings Logic:
// // Get Rankings
// apiRouter.get('/rankings', (_req, res) => {
//   res.send(rankings);
// });

// // Update Rankings
// apiRouter.post('/rankings', (req, res) => {
//   const playerData = req.body;

//   const index = rankings.findIndex((p) => p.name === playerData.name);
//   if (index !== -1) {
//     rankings[index] = playerData;
//   } else {
//     rankings.push(playerData);
//   }

//   rankings.sort((a, b) => b.score - a.score);
//   res.status(200).send(rankings);
// });

//------------------------------------------------

// const express = require('express');
// const uuid = require('uuid');
// const cors = require('cors'); // For handling cross-origin requests
// const app = express();

// const port = process.argv.length > 2 ? process.argv[2] : 3001;

// // In-memory storage
// let users = {};
// let rankings = [];
// let skills = [];
// let tasks = [];

// // Middleware
// app.use(cors()); // Enable CORS
// app.use(express.json());
// app.use(express.static('public'));

// var apiRouter = express.Router();
// app.use(`/api`, apiRouter);

// // --- Authentication Logic ---
// apiRouter.post('/auth/create', async (req, res) => {
//   const user = users[req.body.email];
//   if (user) {
//     res.status(409).send({ msg: 'Existing user' });
//   } else {
//     const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
//     users[user.email] = user;

//     res.send({ token: user.token });
//   }
// });

// apiRouter.post('/auth/login', async (req, res) => {
//   const user = users[req.body.email];
//   if (user && req.body.password === user.password) {
//     user.token = uuid.v4();
//     res.send({ token: user.token });
//   } else {
//     res.status(401).send({ msg: 'Unauthorized' });
//   }
// });

// apiRouter.delete('/auth/logout', (req, res) => {
//   const user = Object.values(users).find((u) => u.token === req.body.token);
//   if (user) {
//     delete user.token;
//   }
//   res.status(204).end();
// });

// // --- Rankings Routes ---
// apiRouter.get('/rankings', (req, res) => {
//   res.send(rankings.sort((a, b) => b.score - a.score)); // Sort rankings by score (descending)
// });

// apiRouter.post('/rankings', (req, res) => {
//   const { name, score, level } = req.body;
//   if (!name || score == null || level == null) {
//     return res.status(400).send({ msg: 'Invalid ranking data' });
//   }

//   const existingPlayer = rankings.find(
//     (player) => player.name.toLowerCase() === name.toLowerCase()
//   );
//   if (existingPlayer) {
//     existingPlayer.score = score;
//     existingPlayer.level = level;
//   } else {
//     rankings.push({ id: uuid.v4(), name, score, level });
//   }

//   res.status(201).send(rankings);
// });

// // --- Skills Routes ---
// apiRouter.get('/skills', (req, res) => {
//   res.send(skills);
// });

// apiRouter.post('/skills', (req, res) => {
//   const { name } = req.body;
//   if (!name) {
//     return res.status(400).send({ msg: 'Invalid skill data' });
//   }

//   if (skills.some((skill) => skill.name.toLowerCase() === name.toLowerCase())) {
//     return res.status(409).send({ msg: 'Skill already exists' });
//   }

//   const newSkill = { id: uuid.v4(), name, points: 0, level: 1 };
//   skills.push(newSkill);

//   res.status(201).send(newSkill);
// });

// apiRouter.delete('/skills/:id', (req, res) => {
//   const skillId = req.params.id;
//   skills = skills.filter((skill) => skill.id !== skillId);
//   tasks = tasks.filter((task) => task.skillId !== skillId); // Remove associated tasks
//   res.status(204).end();
// });

// // --- Tasks Routes ---
// apiRouter.get('/tasks', (req, res) => {
//   res.send(tasks);
// });

// apiRouter.post('/tasks', (req, res) => {
//   const { name, xp, completed, skillId } = req.body;
//   if (!name || xp == null || !skillId) {
//     return res.status(400).send({ msg: 'Invalid task data' });
//   }

//   const newTask = { id: uuid.v4(), name, xp, completed: !!completed, skillId };
//   tasks.push(newTask);

//   res.status(201).send(newTask);
// });

// apiRouter.put('/tasks/:id', (req, res) => {
//   const taskId = req.params.id;
//   const task = tasks.find((t) => t.id === taskId);

//   if (task) {
//     task.completed = req.body.completed ?? task.completed;
//     res.send(task);
//   } else {
//     res.status(404).send({ msg: 'Task not found' });
//   }
// });

// apiRouter.delete('/tasks/:id', (req, res) => {
//   const taskId = req.params.id;
//   tasks = tasks.filter((task) => task.id !== taskId);
//   res.status(204).end();
// });

// // --- Default Route ---
// app.get('*', (_req, res) => {
//   res.sendFile('index.html', { root: 'public' });
// });

// // --- Start Server ---
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });
