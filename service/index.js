const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3001;


// In- memory storageok, wha
let users = {};
let rankings = [];

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

//Skills logic:
// Update Skills and Tasks for a User
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

//Rankings Logic:
// Get Rankings
apiRouter.get('/rankings', (_req, res) => {
    res.send(rankings);
});

// Update Rankings
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
  
// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});
  
// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
