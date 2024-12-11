const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('olaga');

const userCollection = db.collection('user');
const tasksCollection = db.collection('tasks');
const rankingsCollection = db.collection('rankings');

// Test Database Connection
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database: ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };
  await userCollection.insertOne(user);
  return user;
}

async function getSkills(email) {
  const tasks = await tasksCollection.find({ email }).toArray();
  const userScore = await rankingsCollection.findOne({ email });
  const score = userScore ? userScore.score : 0;
  return { tasks, score };
}

async function addSkill(email, name) {
  await tasksCollection.insertOne({ email, name, completed: false });
  return getSkills(email);
}

async function completeTask(email, name) {
  const task = await tasksCollection.findOneAndUpdate(
    { email, name, completed: false },
    { $set: { completed: true } }
  );

  if (task.value) {
    await rankingsCollection.updateOne(
      { email },
      { $inc: { score: 10 } },
      { upsert: true }
    );
  }
  return getSkills(email);
}

async function deleteTask(email, name) {
  const task = await tasksCollection.findOneAndDelete({ email, name });

  if (task.value && task.value.completed) {
    await rankingsCollection.updateOne(
      { email },
      { $inc: { score: -10 } }
    );
  }
  return getSkills(email);
}

async function getRankings() {
  return rankingsCollection
    .find({}, { projection: { _id: 0, email: 1, score: 1 } })
    .sort({ score: -1 })
    .limit(10)
    .toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  getSkills,
  addSkill,
  completeTask,
  deleteTask,
  getRankings,
};

