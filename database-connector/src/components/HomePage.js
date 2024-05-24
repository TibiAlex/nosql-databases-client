import React from 'react';
import DatabaseButton from './DatabaseButton';

const HomePage = () => {
  console.log('HomePage rendered');
  return (
    <div>
      <h1>Select a Database</h1>
      {['MongoDB', 'Redis', 'Cassandra', 'ElasticSearch', 'Neo4j'].map((db) => (
        <DatabaseButton key={db} name={db} />
      ))}
    </div>
  );
};

export default HomePage;
