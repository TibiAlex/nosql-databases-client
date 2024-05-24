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

async function queryElastic() {
    await client.index({
        index: 'game-of-thrones',
        body: {
        character: 'Ned Stark',
        quote: 'Winter is coming.'
        }
    })
    
    await client.index({
        index: 'game-of-thrones',
        body: {
        character: 'Daenerys Targaryen',
        quote: 'I am the blood of the dragon.'
        }
    })
    
    await client.index({
        index: 'game-of-thrones',
        body: {
        character: 'Tyrion Lannister',
        quote: 'A mind needs books like a sword needs whetstone.'
        }
    })
    
    await client.indices.refresh({index: 'game-of-thrones'})
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