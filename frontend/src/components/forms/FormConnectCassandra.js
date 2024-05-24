import React, { useState } from 'react';
import './Form.css';

const Form = ({ onSubmit }) => {
  const [contactPoints, setContactPoints] = useState('localhost:9042');
  const [localDataCenter, setLocalDataCenter] = useState('datacenter1');
  const [keyspace, setKeyspace] = useState('store');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ contactPoints, localDataCenter, keyspace });
  };

  return (
    <div className="form-container">
      <h2>Connect</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>contactPoints: </label>
          <input
            type="text"
            value={contactPoints}
            onChange={(e) => setContactPoints(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>localDataCenter: </label>
          <input
            type="text"
            value={localDataCenter}
            onChange={(e) => setLocalDataCenter(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>keyspace: </label>
          <input
            type="text"
            value={keyspace}
            onChange={(e) => setKeyspace(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Form;
