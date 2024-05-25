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

async function queryRedis(commands) {
    if (!client) {
        console.error('Redis client is not connected');
        return;
    }

    for (const command of commands) {
        const [cmd, ...args] = command.split(' ');
        try {
          let result;
          switch (cmd.toUpperCase()) {
            case 'SET':
              result = await client.set(args[0], args.slice(1).join(' '));
              break;
            case 'GET':
              result = await client.get(args[0]);
              break;
            case 'SETEX':
              result = await client.setEx(args[0], args[1], args.slice(2).join(' '));
              break;
            case 'TTL':
              result = await client.ttl(args[0]);
              break;
            case 'INCR':
              result = await client.incr(args[0]);
              break;
            case 'RPUSH':
              result = await client.rPush(args[0], args.slice(1));
              break;
            case 'LRANGE':
              result = await client.lRange(args[0], args[1], args[2]);
              break;
            case 'LPOP':
              result = await client.lPop(args[0]);
              break;
            case 'SADD':
              result = await client.sAdd(args[0], args.slice(1));
              break;
            case 'SMEMBERS':
              result = await client.sMembers(args[0]);
              break;
            case 'SREM':
              result = await client.sRem(args[0], args.slice(1));
              break;
            case 'HSET':
              result = await client.hSet(args[0], args[1], args.slice(2).join(' '));
              break;
            case 'HGET':
              result = await client.hGet(args[0], args[1]);
              break;
            case 'HGETALL':
              result = await client.hGetAll(args[0]);
              break;
            case 'DEL':
              result = await client.del(args[0]);
              break;
            case 'EXISTS':
              result = await client.exists(args[0]);
              break;
            case 'PUBLISH':
              result = await client.publish(args[0], args.slice(1).join(' '));
              break;
            case 'SUBSCRIBE':
              client.subscribe(args[0]);
              client.on('message', (channel, message) => {
                console.log(`Received message from ${channel}: ${message}`);
              });
              break;
            case 'MULTI':
              client.multi();
              break;
            case 'EXEC':
              result = await client.exec();
              break;
            default:
              throw new Error(`Unsupported command: ${cmd}`);
          }
          if (result) {
            console.log(`Executed command: ${command} - Result: ${result}`);
          } else {
            console.log(`Executed command: ${command}`);
          }
        } catch (error) {
          console.error(`Error executing command: ${command}`, error);
        }
    }
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