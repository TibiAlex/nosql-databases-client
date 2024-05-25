var neo4j = require('neo4j-driver');

let driver

// {
//     "uri": "neo4j://localhost:7687"
// }
async function connectToNeo4j(uri) {
    try {
        driver = neo4j.driver(uri)
        const serverInfo = await driver.getServerInfo()
        console.log('Connection established')
        console.log(serverInfo)
      } catch(err) {
        console.log(`Connection error\n${err}\nCause: ${err.cause}`)
      }
}

async function queryNeo4j(fileContents) {
  try {
    session = driver.session();

    const statements = fileContents.split(';').filter(statement => statement.trim() !== '');

    for (const statement of statements) {
      try {
        // Execute the statement
        await session.run(statement);
        console.log(`Statement executed successfully: ${statement}`);
      } catch (error) {
        console.error(`Error executing statement: ${statement}`, error);
      }
    }
  } catch (err) {
    console.log(`Query error\n${err}\nCause: ${err.cause}`)
  }
}

async function disconnectFromNeo4j() {
    if (driver) {
        await driver.close()
        console.log('Disconnected from Neo4j')
    }
}

module.exports = {
  connectToNeo4j,
  queryNeo4j,
  disconnectFromNeo4j,
}