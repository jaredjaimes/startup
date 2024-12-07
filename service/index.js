// const express = require('express');
// const uuid = require('uuid');
// const app = express();

// const port = process.argv.length > 2 ? process.argv[2] : 3000;


// // In- memory storageok, wha
// let users = {};
// let rankings = [];

// // Middleware
// app.use(express.json());

// // Serves up front-end static content hosting.
// //  The React app and backend are hosted on the same server, simplifying deployment and allowing seamless integration between the frontend and backend.
// app.use(express.static('public'));

// var apiRouter = express.Router();
// app.use(`/api`, apiRouter);

// //Login Logic
// // CreateAuth a new user
// apiRouter.post('/auth/create', async (req, res) => {
//     const user = users[req.body.email];
//     if (user) {
//       res.status(409).send({ msg: 'Existing user' });
//     } else {
//       const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
//       users[user.email] = user;
  
//       res.send({ token: user.token });
//     }
// });

// // GetAuth login an existing user
// apiRouter.post('/auth/login', async (req, res) => {
//     const user = users[req.body.email];
//     if (user) {
//       if (req.body.password === user.password) {
//         user.token = uuid.v4();
//         res.send({ token: user.token });
//         return;
//       }
//     }
//     res.status(401).send({ msg: 'Unauthorized' });
// });

// // DeleteAuth logout a user
// apiRouter.delete('/auth/logout', (req, res) => {
//     const user = Object.values(users).find((u) => u.token === req.body.token);
//     if (user) {
//       delete user.token;
//     }
//     res.status(204).end();
// });

// // Return the application's default page if the path is unknown
// app.use((_req, res) => {
//     res.sendFile('index.html', { root: 'public' });
// });


// //Skills logic:
// // Update Skills and Tasks for a User
// apiRouter.post('/skills/:username', (req, res) => {
//     const { username } = req.params;
//     const { skills, tasks } = req.body;
  
//     if (!users[username]) {
//       users[username] = { skills: [], tasks: [] };
//     }
  
//     users[username].skills = skills || users[username].skills;
//     users[username].tasks = tasks || users[username].tasks;
  
//     res.status(200).send(users[username]);
// });

// //Rankings Logic:
// // Get Rankings
// apiRouter.get('/rankings', (_req, res) => {
//     res.send(rankings);
// });

// // Update Rankings
// apiRouter.post('/rankings', (req, res) => {
//     const playerData = req.body;
  
//     const index = rankings.findIndex((p) => p.name === playerData.name);
//     if (index !== -1) {
//       rankings[index] = playerData;
//     } else {
//       rankings.push(playerData);
//     }
  
//     rankings.sort((a, b) => b.score - a.score);
//     res.status(200).send(rankings);
// });
  
  
// // Start server
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

// const express = require('express');
// const uuid = require('uuid');
// const app = express();

// const port = process.argv.length > 2 ? process.argv[2] : 5000;

// // In-memory storage
// let users = {};
// let rankings = [];

// // Middleware
// app.use(express.json());
// app.use(express.static('public'));

// // API Router
// var apiRouter = express.Router();
// app.use(`/api`, apiRouter);

// // Authentication Logic
// apiRouter.post('/auth/create', async (req, res) => {
//   const user = users[req.body.email];
//   if (user) {
//     res.status(409).send({ msg: 'Existing user' });
//   } else {
//     const newUser = { email: req.body.email, password: req.body.password, token: uuid.v4() };
//     users[newUser.email] = newUser;
//     res.send({ token: newUser.token });
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

// // Skills Logic
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

// apiRouter.get('/skills/:username', (req, res) => {
//   const { username } = req.params;

//   if (users[username]) {
//     res.status(200).send(users[username]);
//   } else {
//     res.status(404).send({ msg: 'User not found' });
//   }
// });

// // Rankings Logic
// apiRouter.get('/rankings', (_req, res) => {
//   res.send(rankings);
// });

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

// // Fallback Route
// app.use((_req, res) => {
//   res.sendFile('index.html', { root: 'public' });
// });

// // Start Server
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 5000;

// In-memory storage
let users = {};
let rankings = [];

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Router
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Authentication Logic
apiRouter.post('/auth/create', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const newUser = { email: req.body.email, password: req.body.password, token: uuid.v4() };
    users[newUser.email] = newUser;
    res.send({ token: newUser.token });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  console.log('Login request:', req.body); // Log the incoming request

  const user = users[req.body.email];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      console.log('Login successful for:', req.body.email); // Log successful login
      res.send({ token: user.token });
      return;
    }
  }
  console.error('Unauthorized login attempt:', req.body.email); // Log unauthorized login attempt
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', (req, res) => {
  console.log('Logout request:', req.body); // Log the incoming request

  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
    console.log('Logout successful for:', user.email); // Log successful logout
  } else {
    console.error('Logout attempt with invalid token:', req.body.token); // Log invalid token
  }
  res.status(204).end();
});

// Skills Logic
apiRouter.post('/skills/:username', (req, res) => {
  const { username } = req.params;
  const { skills, tasks } = req.body;

  if (!users[username]) {
    users[username] = { skills: [], tasks: [] };
  }

  users[username].skills = skills || users[username].skills;
  users[username].tasks = tasks || users[username].tasks;

  res.status(200).send(users[username]);
});

apiRouter.get('/skills/:username', (req, res) => {
  const { username } = req.params;

  if (users[username]) {
    res.status(200).send(users[username]);
  } else {
    res.status(404).send({ msg: 'User not found' });
  }
});

// Rankings Logic
apiRouter.get('/rankings', (_req, res) => {
  res.send(rankings);
});

apiRouter.post('/rankings', (req, res) => {
  const playerData = req.body;

  const index = rankings.findIndex((p) => p.name === playerData.name);
  if (index !== -1) {
    rankings[index] = playerData;
  } else {
    rankings.push(playerData);
  }

  rankings.sort((a, b) => b.score - a.score);
  res.status(200).send(rankings);
});

// Fallback Route
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Start Server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
