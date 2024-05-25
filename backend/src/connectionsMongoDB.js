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
async function queryMongoDB(documentToInsert) {
  if (!database) {
    throw new Error("Not connected to the database");
  }
  try {
    // Select the database
    const database = client.db(dbName);

    // Select the collection
    const collection = database.collection('my_collection');

    // Insert the document into the collection
    const insertResult = await collection.insertOne(documentToInsert);
    console.log('Document inserted:', insertResult.insertedId);
  } catch (error) {
    console.error('Error inserting document:', error);
  }
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