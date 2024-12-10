const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4001;

// Middleware
// You do this because all of our endpoints use JSON and so we want Express to automatically parse that for us.
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serves up front-end static content hosting.
//  The React app and backend are hosted on the same server, simplifying deployment and allowing seamless integration between the frontend and backend.
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//test if backend is running.
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// // Avatar routes -----------------------------------------------
// secureApiRouter.post('/avatar', async (req, res) => {
//   const avatar = { ...req.body, userId: req.userId };
//   await DB.saveAvatar(avatar);
//   res.status(201).send(avatar);
// });

// Skills routes------------------------------------------------
secureApiRouter.get('/skills', async (req, res) => {
  const skills = await DB.getSkills(req.userId);
  res.send(skills);
});

secureApiRouter.post('/skills', async (req, res) => {
  const skill = { ...req.body, userId: req.userId };
  await DB.saveSkill(skill);
  res.status(201).send(skill);
});

// Rankings routes----------------------------------------------
secureApiRouter.get('/rankings', async (_req, res) => {
  const rankings = await DB.getRankings();
  res.send(rankings);
});

secureApiRouter.post('/rankings', async (req, res) => {
  const ranking = { ...req.body, userId: req.userId };
  await DB.saveRanking(ranking);
  res.status(201).send(ranking);
});

//OTher codes for handling---------------------------------------
// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Start server
app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Listening on 0.0.0.0:${port}`);
  }
});


//-----------------------------------------------
