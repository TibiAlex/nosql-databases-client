import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

const DatabasePage = () => {
  const { database } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [connectionDetails, setConnectionDetails] = useState(null);

  const handleConnectClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch(`/connect/${database}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Connection failed');
      }

      const result = await response.text();
      setConnectionDetails(result);
      console.log(`Connected to ${database} with`, formData);
    } catch (error) {
      console.error('Error connecting to database:', error);
    }
  };

  const handleQueryClick = async () => {
    try {
      const response = await fetch(`/query/${database}`, {
        method: database === 'elastic' || database === 'neo4j' ? 'POST' : 'GET'
      });

      if (!response.ok) {
        throw new Error('Query failed');
      }

      const result = await response.json();
      console.log('Query result:', result);
    } catch (error) {
      console.error('Error querying database:', error);
    }
  };

  const handleDisconnectClick = async () => {
    try {
      const response = await fetch(`/disconnect/${database}`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Disconnection failed');
      }

      const result = await response.text();
      console.log(result);
      setConnectionDetails(null);
    } catch (error) {
      console.error('Error disconnecting from database:', error);
    }
  };

  return (
    <div>
      <h1>{database} Database</h1>
      <button onClick={handleConnectClick}>Connect</button>
      <button onClick={handleQueryClick}>Query</button>
      <button onClick={handleDisconnectClick}>Disconnect</button>
      {showForm && <Form onSubmit={handleFormSubmit} />}
      {connectionDetails && (
        <div>
          <p>Connected to {database} with the following details:</p>
          <pre>{JSON.stringify(connectionDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DatabasePage;
