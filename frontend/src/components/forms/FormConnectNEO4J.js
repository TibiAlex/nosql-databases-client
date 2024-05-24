import React, { useState } from 'react';
import './Form.css';

const Form = ({ onSubmit }) => {
  const [uri, setUri] = useState('neo4j://localhost:7687');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ uri });
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
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Form;
