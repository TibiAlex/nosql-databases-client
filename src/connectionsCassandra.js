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

async function queryCassandra() {
    if (!client) {
      throw new Error('Not connected to the database');
    }
    const query = 'SELECT * FROM store.shopping_cart';
    try {
      const result = await client.execute(query);
      console.log('Shopping Cart:', result.rows); // Print the values here
      return result.rows;
    } catch (err) {
      console.error('Error fetching shopping cart:', err);
      throw err;
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