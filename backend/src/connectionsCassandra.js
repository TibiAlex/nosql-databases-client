const cassandra = require('cassandra-driver');

let client;

// Configuration options for the Cassandra client
const contactPoints = ['jdbc:cassandra://localhost:9042/store']; // Replace with your actual contact points
const localDataCenter = 'datacenter1'; // Replace with your actual data center name
const keyspace = 'your_keyspace'; // Replace with your actual keyspace name, if needed

// {
//     "contactPoints": "localhost:9042",
//     "localDataCenter": "datacenter1",
//     "keyspace": "store"
// }
// Function to connect to the Cassandra database
async function connectToCassandra(contactPoints, localDataCenter, keyspace) {
    client = new cassandra.Client({ 
        contactPoints: [contactPoints],
        localDataCenter: localDataCenter,
        keyspace: keyspace
    });
    try {
        await client.connect();
        console.log('Connected to Cassandra');
    } catch (err) {
        console.error('Error connecting to Cassandra:', err);
    }
}

async function queryCassandra(queries) {
    if (!client) {
      throw new Error('Not connected to the database');
    }
    for (const query of queries) {
      try {
        if (query.toUpperCase().startsWith('USE')) {
          // Skip USE keyspace query since we already set the keyspace in the client configuration
          console.log(`Skipping query: ${query}`);
          continue;
        }
        const result = await client.execute(query);
        console.log(`Executed query: ${query}`);
        if (result.rows) {
          console.log('Result:', result.rows);
        }
      } catch (error) {
        console.error(`Error executing query: ${query}`);
        console.error(error);
      }
    }
  }

// Function to close the connection
async function disconnectFromCassandra() {
    try {
        await client.shutdown();
        console.log('Disconnected from Cassandra');
    } catch (err) {
        console.error('Error disconnecting from Cassandra:', err);
    }
}

module.exports = {
  connectToCassandra,
  queryCassandra,
  disconnectFromCassandra,
};