import React, { useState } from 'react';
import './Form.css';

const Form = ({ onSubmit }) => {
  const [node, setNode] = useState('https://localhost:9200');
  const [username, setUsername] = useState('elastic');
  const [password, setPassword] = useState('-0x5F9VVsj9ooC5e0WOt');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ node, username, password });
  };

  return (
    <div className="form-container">
      <h2>Connect</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>node: </label>
          <input
            type="text"
            value={node}
            onChange={(e) => setNode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>password: </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Form;
