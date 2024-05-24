import React, { useState } from 'react';
import './Form.css';

const Form = ({ onSubmit }) => {
  const [uri, setUri] = useState('mongodb://root:password@localhost:27017/');
  const [databaseName, setDatabaseName] = useState('admin');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ uri, databaseName });
  };

  return (
    <div className="form-container">
      <h2>Connect</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>URI: </label>
          <input
            type="text"
            value={uri}
            onChange={(e) => setUri(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>DatabaseName: </label>
          <input
            type="text"
            value={databaseName}
            onChange={(e) => setDatabaseName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Form;
