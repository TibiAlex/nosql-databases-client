const { Client } = require('@elastic/elasticsearch')

let client

// {
//     "node": "https://localhost:9200",
//     "username": "elastic",
//     "password": "-0x5F9VVsj9ooC5e0WOt"
// }
async function connectToElastic(node, username, password) {
    client = new Client({
        node: node,
        auth: {
            username: username,
            password: password
        },
        tls: {
            rejectUnauthorized: false,
        },
    })
  
    await client.info()
    .then(response => console.log(response))
    .catch(error => console.error(error))
}

async function queryElastic(data) {
    for (const query of data.queries) {
        try {
          let response;
          switch (query.method) {
            case 'GET':
              response = await client.transport.request({
                method: 'GET',
                path: query.endpoint,
                body: query.body
              });
              break;
            case 'POST':
              if (query.endpoint === '/my_index/_bulk') {
                // Bulk request must be formatted correctly with newlines and include index in each action metadata
                const bulkBody = query.body.map(item => JSON.stringify(item)).join('\n') + '\n';
                response = await client.bulk({ index: 'my_index', body: bulkBody });
              } else {
                response = await client.transport.request({
                  method: 'POST',
                  path: query.endpoint,
                  body: query.body
                });
              }
              break;
            case 'PUT':
              response = await client.transport.request({
                method: 'PUT',
                path: query.endpoint,
                body: query.body
              });
              break;
            case 'DELETE':
              response = await client.transport.request({
                method: 'DELETE',
                path: query.endpoint
              });
              break;
            default:
              console.log(`Unknown method: ${query.method}`);
              continue;
          }
          console.log(`${query.description} - Status: ${response.statusCode || response.status}`);
        } catch (error) {
          console.error(`${query.description} - Error: ${error.message}`);
          if (error.meta && error.meta.body) {
            console.error(`        Root causes:`);
            error.meta.body.error.root_cause.forEach(cause => {
              console.error(`                ${cause.type}: ${cause.reason}`);
            });
          }
        }
    }
}   

async function disconnectFromElastic() {
    if (client) {
        await client.close()
        console.log('Disconnected from Elastic')
    }
}

module.exports = {
  connectToElastic,
  queryElastic,
  disconnectFromElastic,
};