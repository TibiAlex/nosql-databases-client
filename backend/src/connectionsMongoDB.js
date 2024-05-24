const { MongoClient } = require("mongodb");

// {
//   "uri": "mongodb://root:password@localhost:27017/",
//   "databaseName": "admin"
// }
async function connectToDatabase(uri, databaseName) {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log("Connected correctly to server");
  database = client.db(databaseName);
}

//  to be changed after finging tests
async function queryMongoDB() {
  if (!database) {
    throw new Error("Not connected to the database");
  }
  const usersCollection = database.collection('system.users');
  const users = await usersCollection.find({}).toArray();
  return users;
}

async function closeConnection() {
  if (client) {
    await client.close();
    console.log("Connection closed");
    client = null;
    database = null;
  }
}

module.exports = {
  connectToDatabase,
  queryMongoDB,
  closeConnection,
};