// Create users
CREATE (:User {id: 1, name: 'Alice', email: 'alice@example.com'});
CREATE (:User {id: 2, name: 'Bob', email: 'bob@example.com'});

// Create products
CREATE (:Product {id: 101, name: 'Product A', price: 10.99});
CREATE (:Product {id: 102, name: 'Product B', price: 15.99});

// Establish relationships (e.g., Alice buys Product A)
MATCH (u:User {id: 1}), (p:Product {id: 101})
CREATE (u)-[:MADE_PURCHASE]->(p);