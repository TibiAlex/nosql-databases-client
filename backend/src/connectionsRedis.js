const { createClient } = require('redis');

let client

// {
//     "url": "redis://alice:foobared@awesome.redis.server:6380"
// }
async function connectToRedis(host) {
    client = createClient();

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();
    console.log('Connected to Redis');
}

async function queryRedis() {
}

async function disconnectFromRedis() {
    if (client) {
        client.quit();
        console.log('Disconnected from Redis');
    }
}

module.exports = {
  connectToRedis,
  queryRedis,
  disconnectFromRedis,
};