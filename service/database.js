const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('olaga');

//Collections:
const avatarsCollection = db.collection('avatars');
const userCollection = db.collection('user');
const skillsCollection = db.collection('skills');
const rankingsCollection = db.collection('rankings');


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

//Avatar:--------------------------------------
async function saveAvatar(avatar) {
  return await avatarsCollection.updateOne(
    { userId: avatar.userId },
    { $set: avatar },
    { upsert: true }
  );
}

async function getAvatar(userId) {
  console.log(`Querying avatar for userId: ${userId}`);

  try {
    const avatar = await avatarsCollection.findOne({ userId });
    console.log('Database result:', avatar);
    return avatar;
  } catch (err) {
    console.error('Error in getAvatar:', err);
    throw err; // Re-throw the error for the route handler to catch
  }
}

//Skills:--------------------------------------------
async function saveSkill(skill) {
  return await skillsCollection.updateOne(
    { userId: skill.userId, name: skill.name },
    { $set: skill },
    { upsert: true }
  );
}

async function getSkills(userId) {
  return await skillsCollection.find({ userId }).toArray();
}

//Rankings:-------------------------------------------
async function saveRanking(ranking) {
  return await rankingsCollection.updateOne(
    { userId: ranking.userId },
    { $set: ranking },
    { upsert: true }
  );
}

async function getRankings() {
  return await rankingsCollection.find().sort({ score: -1 }).toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  saveAvatar,
  getAvatar,
  saveSkill,
  getSkills,
  saveRanking,
  getRankings,
};
