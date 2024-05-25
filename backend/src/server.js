const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { connectToDatabase, queryMongoDB, closeConnection } = require('./connectionsMongoDB');
const { connectToCassandra, queryCassandra, disconnectFromCassandra } = require('./connectionsCassandra');
const { connectToRedis, queryRedis, disconnectFromRedis } = require('./connectionsRedis');
const { connectToElastic, queryElastic, disconnectFromElastic } = require('./connectionsElastic');
const { connectToNeo4j, queryNeo4j, disconnectFromNeo4j } = require('./connectionsNeo4j');

const app = express();
const port = 3001;
const upload = multer({ dest: 'uploads/' });

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

app.post('/connect/elasticsearch', async (req, res) => {
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

app.post('/query/mongodb', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).send('No file uploaded');
        }
        // Display file details received in the JSON
        console.log('File details from JSON:', file);

        const filePath = file.path;
        const fileContents = fs.readFileSync(filePath, 'utf8');

        queryMongoDB(fileContents);

        res.send(`File contents:\n${fileContents}`);

        fs.unlinkSync(filePath);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
    }
});

app.post('/query/cassandra', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).send('No file uploaded');
        }
        // Display file details received in the JSON
        console.log('File details from JSON:', file);

        const filePath = file.path;
        const fileContents = fs.readFileSync(filePath, 'utf8');

        const queries = fileContents.split(';').map(query => query.trim()).filter(query => query.length > 0);
        queryCassandra(queries);

        res.send(`File contents:\n${fileContents}`);

        fs.unlinkSync(filePath);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
    }
});

app.post('/query/redis', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).send('No file uploaded');
        }
        // Display file details received in the JSON
        console.log('File details from JSON:', file);

        const filePath = file.path;
        const fileContents = fs.readFileSync(filePath, 'utf8');

        const commands = fileContents.split('\n').map(cmd => cmd.trim()).filter(cmd => cmd.length > 0 && !cmd.startsWith('#'));

        queryRedis(commands);

        res.send(`File contents:\n${fileContents}`);

        fs.unlinkSync(filePath);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
    }
});

app.post('/query/elasticsearch', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).send('No file uploaded');
        }
        // Display file details received in the JSON
        console.log('File details from JSON:', file);

        const filePath = file.path;
        const fileContents = fs.readFileSync(filePath, 'utf8');

        const data = JSON.parse(fileContents);
        queryElastic(data);

        res.send(`File contents:\n${fileContents}`);

        fs.unlinkSync(filePath);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
    }
});

app.post('/query/neo4j', upload.single('file'), (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).send('No file uploaded');
        }
        // Display file details received in the JSON
        console.log('File details from JSON:', file);

        const filePath = file.path;
        const fileContents = fs.readFileSync(filePath, 'utf8');
        queryNeo4j(fileContents);

        res.send(`File contents:\n${fileContents}`);

        fs.unlinkSync(filePath);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
    }
});

app.post('/disconnect/mongodb', async (req, res) => {
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

app.post('/disconnect/elasticsearch', async (req, res) => {
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

// Allow all origins
app.use(cors());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});