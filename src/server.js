const express = require('express');
const { connectToDatabase, queryMongoDB, closeConnection } = require('./connectionsMongoDB');
const { connectToCassandra, queryCassandra, disconnectFromCassandra } = require('./connectionsCassandra');
const { connectToRedis, queryRedis, disconnectFromRedis } = require('./connectionsRedis');
const { connectToElastic, queryElastic, disconnectFromElastic } = require('./connectionsElastic');
const { connectToNeo4j, queryNeo4j, disconnectFromNeo4j } = require('./connectionsNeo4j');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/connect/mongodb', async (req, res) => {
    const { uri, databaseName } = req.body;

    if (!uri || !databaseName) {
        console.log('Connection string URI and the name of the database  is required');
        return res.status(400).send('Connection string URI and the name of the database  is required');
    }

    try {
        await connectToDatabase(uri, databaseName);
        console.log('Connected to mongodb');
        res.status(200).send('Connected to mongodb');
    } catch (err) {
        console.error('Error connecting to mongodb:', err);
        res.status(500).send('Error connecting to mongodb');
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
        console.log('Host is required');
        return res.status(400).send('Host is required');
    }

    try {
        await connectToRedis(host);
        console.log(`Connected to Redis`);
        res.status(200).send('Connected to Redis');
    } catch (err) {
        console.error('Error connecting to Redis:', err);
        res.status(500).send('Error connecting to Redis');
    }
});

app.post('/connect/elastic', async (req, res) => {
    const { node, username, password } = req.body;

    if (!node || !username || !password) {
        console.log('node, username, and password are required');
        return res.status(400).send('node, username, and password are required');
    }

    try {
        await connectToElastic(node, username, password);
        console.log('Connected to Elastic');
        res.status(200).send('Connected to Elastic');
    } catch (err) {
        console.error('Error connecting to Elastic:', err);
        res.status(500).send('Error connecting to Elastic');
    }
});

app.post('/connect/neo4j', async (req, res) => {
    const { uri } = req.body;

    if (!uri) {
        console.log('URI is required');
        return res.status(400).send('URI is required');
    }

    try {
        await connectToNeo4j(uri);
        console.log('Connected to Neo4j');
        res.status(200).send('Connected to Neo4j');
    } catch (err) {
        console.error('Error connecting to Neo4j:', err);
        res.status(500).send('Error connecting to Neo4j');
    }
});

app.get('/query/mongoDB', async (req, res) => {
    try {
      const response = await queryMongoDB();
      res.status(200).json(response);
    } catch (err) {
      console.error('Error fetching users');
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

app.get('/query/redis', async (req, res) => {
    try {
        const response = await queryRedis();
        res.status(200).json(response);
      } catch (err) {
        console.error('Error fetching shopping cart:', err);
        res.status(500).send('Error fetching shopping cart');
      }
});

app.post('/query/elastic', async (req, res) => {
    try {
        await queryElastic();
        res.status(200).send('Query executed');
      } catch (err) {
        console.error('Error querying Elastic:', err);
        res.status(500).send('Error querying Elastic');
      }
});

app.post('/query/neo4j', async (req, res) => {
});

app.post('/disconnect/mongoDB', async (req, res) => {
    try {
      await closeConnection();
      console.log('Disconnected from mongoDB');
      res.status(200).send('Disconnected from mongoDB');
    } catch (err) {
      console.error('Error disconnecting from mongoDB:', err);
      res.status(500).send('Error disconnecting from mongoDB');
    }
});

app.post('/disconnect/cassandra', async (req, res) => {
    try {
      await disconnectFromCassandra();
      console.log('Disconnected from Cassandra');
      res.status(200).send('Disconnected from Cassandra');
    } catch (err) {
      console.error('Error disconnecting from Cassandra:', err);
      res.status(500).send('Error disconnecting from Cassandra');
    }
});

app.post('/disconnect/redis', async (req, res) => {
    try {
        await disconnectFromRedis();
        console.log('Disconnected from Redis');
        res.status(200).send('Disconnected from Redis');
      } catch (err) {
        console.error('Error disconnecting from Redis:', err);
        res.status(500).send('Error disconnecting from Redis');
    }
});

app.post('/disconnect/elastic', async (req, res) => {
    try {
        await disconnectFromElastic();
        console.log('Disconnected from Elastic');
        res.status(200).send('Disconnected from Elastic');
      } catch (err) {
        console.error('Error disconnecting from Elastic:', err);
        res.status(500).send('Error disconnecting from Elastic');
    }
});

app.post('/disconnect/neo4j', async (req, res) => {
    try {
        await disconnectFromNeo4j();
        console.log('Disconnected from Neo4j');
        res.status(200).send('Disconnected from Neo4j');
      } catch (err) {
        console.error('Error disconnecting from Neo4j:', err);
        res.status(500).send('Error disconnecting from Neo4j');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});