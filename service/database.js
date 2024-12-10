const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('olaga');

const userCollection = db.collection('user');

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

module.exports = {
  getUser,
  getUserByToken,
  createUser,
};































// //-----------------------------------------------------------
// (async function testConnection() {
//   try {
//     await client.connect();
//     await db.command({ ping: 1 });
//     console.log('Connected to the database.');
//   } catch (error) {
//     console.error('Database connection failed:', error.message);
//     process.exit(1);
//   }
// })();
// //-----------------------------------------------------------------

// async function getSkills() {
//   const skills = await skillsCollection.find().toArray();
//   const score = skills.reduce((total, skill) => total + (skill.completed ? 10 : 0), 0);
//   return { tasks: skills, score };
// }

// async function addSkill(name) {
//   await skillsCollection.insertOne({ name, completed: false });
//   return getSkills();
// }

// async function completeTask(taskName) {
//   const result = await skillsCollection.updateOne(
//     { name: taskName },
//     { $set: { completed: true } }
//   );
//   if (result.matchedCount === 0) {
//     throw new Error(`Task '${taskName}' not found.`);
//   }
//   return getSkills();
// }

// async function deleteTask(taskName) {
//   const result = await skillsCollection.deleteOne({ name: taskName });
//   if (result.deletedCount === 0) {
//     throw new Error(`Task '${taskName}' not found.`);
//   }
//   return getSkills();
// }

// async function getRankings() {
//   return skillsCollection
//     .find({ score: { $gte: 0 } })
//     .sort({ score: -1 })
//     .limit(10)
//     .toArray();
// }

// async function addRanking(name, score) {
//   const existingRecord = await skillsCollection.findOne({ name });
//   if (existingRecord) {
//     if (existingRecord.score < score) {
//       await skillsCollection.updateOne(
//         { name },
//         { $set: { score, date: new Date() } }
//       );
//     }
//   } else {
//     await skillsCollection.insertOne({
//       name,
//       score,
//       date: new Date(),
//     });
//   }
// }

// async function createUser(email, password) {
//   const passwordHash = await bcrypt.hash(password, 10);
//   const user = { email, password: passwordHash, token: uuid.v4() };
//   await userCollection.insertOne(user);
//   return user;
// }

// function getUser(email) {
//   return userCollection.findOne({ email });
// }

// function getUserByToken(token) {
//   return userCollection.findOne({ token });
// }

// module.exports = {
//   getUser,
//   getUserByToken,
//   createUser,
//   getSkills,
//   addSkill,
//   completeTask,
//   deleteTask,
//   getRankings,
//   addRanking,
// };
