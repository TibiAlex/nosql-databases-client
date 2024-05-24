import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormConnectMongo from './forms/FormConnectMongo';
import FormConnectRedis from './forms/FormConnectRedis';
import FormConnectCassandra from './forms/FormConnectCassandra';
import FormConnectElastic from './forms/FormConnectElastic';
import FormConnectNeo4j from './forms/FormConnectNEO4J';
import axios from 'axios';
import './DatabasePage.css';
import FileUploadFormNeo4j from './forms/FormQueryNEO4J';

const DatabasePage = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  const { database } = useParams();
  const [showFormConnect, setShowFormConnect] = useState(false);
  const [showFormQuery, setShowFormQuery] = useState(false);
  const [connectionDetails, setConnectionDetails] = useState(null);

  const handleConnectClick = () => {
    setShowFormConnect(true);
    setShowFormQuery(false);
  };

  const handleQueryClick = async () => {
    setShowFormConnect(false);
    setShowFormQuery(true);
  };

  const handleFormSubmitConnect = async (formData) => {
    try {
      console.log(database);
      const response = await axios.post(`http://localhost:3001/connect/${database}`, formData);
      if (response.status === 200) {
        const result = await response.text();
        setConnectionDetails(result);
        console.log(connectionDetails)
        console.log(`Connected to ${database} with`, formData);
      } else {
        console.error('Failed to connect:', response.statusText);
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
    }
  };

  const handleFormSubmitQuery = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try { 
      const response = await axios.post(`http://localhost:3001/query/${database}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      const result = await response.text();
      console.log(result);
      setConnectionDetails(result);
      console.log(`Applied query to ${database}`);
    } catch (error) {
      console.error('Error querying the database:', error);
    }
  };

  const handleDisconnectClick = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/disconnect/${database}`);
      const result = await response.text();
      setConnectionDetails(result);
      console.log(`Disconnected from ${database}`);
    } catch (error) {
      console.error('Error disconnecting from database:', error);
    }
  };

  return (
    <div className="database-page-container">
      <h1>{database} Database</h1>
      <div className="button-container">
        <button className="connect-button" onClick={handleConnectClick}>Connect</button>
        <button className="query-button" onClick={handleQueryClick}>Query</button>
        <button className="disconnect-button" onClick={handleDisconnectClick}>Disconnect</button>
      </div>
      {showFormConnect && database === 'mongodb' && <FormConnectMongo onSubmit={handleFormSubmitConnect} />}
      {showFormConnect && database === 'redis' && <FormConnectRedis onSubmit={handleFormSubmitConnect} />}
      {showFormConnect && database === 'cassandra' && <FormConnectCassandra onSubmit={handleFormSubmitConnect} />}
      {showFormConnect && database === 'elasticsearch' && <FormConnectElastic onSubmit={handleFormSubmitConnect} />}
      {showFormConnect && database === 'neo4j' && <FormConnectNeo4j onSubmit={handleFormSubmitConnect} />}
      {connectionDetails && (
        <div>
          <p>Connected to {database} with the following details:</p>
          <pre>{JSON.stringify(connectionDetails, null, 2)}</pre>
        </div>
      )}
      {showFormQuery && database === 'neo4j' && <FileUploadFormNeo4j onSubmit={handleFormSubmitQuery} />}
      <br></br>
      <button className="home-button" onClick={handleClick}>Home</button>
    </div>
  );
};

export default DatabasePage;
