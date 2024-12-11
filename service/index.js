const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const uuid = require('uuid');
const cors = require('cors');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4001;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.static('public'));
app.set('trust proxy', true);

const apiRouter = express.Router();
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Authentication Routes
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ id: user._id });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    setAuthCookie(res, user.token);
    res.send({ id: user._id });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Secure Routes
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Skills Routes
secureApiRouter.get('/skills', async (req, res) => {
  try {
    const { tasks, score } = await DB.getSkills(req.user.email);
    res.json({ tasks, score });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

secureApiRouter.post('/skills', async (req, res) => {
  try {
    const { name } = req.body;
    const updatedSkills = await DB.addSkill(req.user.email, name);
    res.json(updatedSkills);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

secureApiRouter.post('/skills/:taskName/complete', async (req, res) => {
  try {
    const taskName = req.params.taskName;
    const updatedSkills = await DB.completeTask(req.user.email, taskName);
    res.json(updatedSkills);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

secureApiRouter.delete('/skills/:taskName', async (req, res) => {
  try {
    const taskName = req.params.taskName;
    const updatedSkills = await DB.deleteTask(req.user.email, taskName);
    res.json(updatedSkills);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Rankings Route
secureApiRouter.get('/rankings', async (req, res) => {
  try {
    const rankings = await DB.getRankings();
    res.json(rankings);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Utility Functions
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Start Server
app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on 0.0.0.0:${port}`);
});
