import React from 'react';
import DatabaseButton from './DatabaseButton';
import './HomePage.css';

const HomePage = () => {
  console.log('HomePage rendered');
  return (
    <div>
      <h1>Select a Database</h1>
      <div className="database-buttons">
        {['MongoDB', 'Redis', 'Cassandra', 'ElasticSearch', 'Neo4j'].map((db) => (
          <DatabaseButton key={db} name={db} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
