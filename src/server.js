const express = require('express');
const { connectToDatabase, queryMongoDB, closeConnection } = require('./connectionsMongoDB');
const { connectToCassandra, queryCassandra, disconnectFromCassandra } = require('./connectionsCassandra');
const { connectToRedis, queryRedis, disconnectFromRedis } = require('./connectionsRedis');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/connect/mongodb', async (req, res) => {
    const { uri, databaseName } = req.body;

    if (!uri) {
        return res.status(400).send('Connection string URI is required');
    }

    if (!databaseName) {
        return res.status(400).send('The name of the database is missing');
    }

    try {
        await connectToDatabase(uri, databaseName);
        res.status(200).send('Connected to database');
    } catch (err) {
        res.status(500).send('Error connecting to database');
    }
});

app.post('/connect/cassandra', async (req, res) => {
    const { contactPoints, localDataCenter, keyspace } = req.body;

    if (!contactPoints || !localDataCenter || !keyspace) {
        console.log('Contact points, local data center, and keyspace are required');
        return res.status(400).send('Contact points, local data center, and keyspace are required');
      }

    try {
        await connectToCassandra(contactPoints, localDataCenter, keyspace);
        console.log(`Connected to database with keyspace ${keyspace}`);
        res.status(200).send(`Connected to database with keyspace ${keyspace}`);
    } catch (err) {
        console.error('Error connecting to Cassandra:', err);
        res.status(500).send('Error connecting to Cassandra');
    }
});

app.post('/connect/redis', async (req, res) => {
    const { host } = req.body;

    if (!host) {
        return res.status(400).send('Host is required');
    }

    try {
        await connectToRedis(host);
        res.status(200).send('Connected to Redis');
    } catch (err) {
        res.status(500).send('Error connecting to Redis');
    }
});

app.get('/query/mongoDB', async (req, res) => {
    try {
      const response = await queryMongoDB();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send('Error fetching users');
    }
});

app.get('/query/cassandra', async (req, res) => {
    try {
        const response = await queryCassandra();
        res.status(200).json(response);
      } catch (err) {
        console.error('Error fetching shopping cart:', err);
        res.status(500).send('Error fetching shopping cart');
      }
});

app.post('/disconnect/mongoDB', async (req, res) => {
    try {
      await closeConnection();
      res.status(200).send('Disconnected from database');
    } catch (err) {
      res.status(500).send('Error disconnecting from database');
    }
});

app.post('/disconnect/cassandra', async (req, res) => {
    try {
      await disconnectFromCassandra();
      console.log('Disconnected from database');
      res.status(200).send('Disconnected from database');
    } catch (err) {
      console.error('Error disconnecting from Cassandra:', err);
      res.status(500).send('Error disconnecting from Cassandra');
    }
  });

app.post('/disconnect/redis', async (req, res) => {
    try {
        await disconnectFromRedis();
        res.status(200).send('Disconnected from Redis');
      } catch (err) {
        res.status(500).send('Error disconnecting from Redis');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});