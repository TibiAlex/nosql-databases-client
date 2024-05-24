import React, { useState } from 'react';
import './Form.css';

const Form = ({ onSubmit }) => {
  const [host, setHost] = useState('redis://alice:foobared@awesome.redis.server:6380');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ host });
  };

  return (
    <div className="form-container">
      <h2>Connect</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group" >
          <label>HOST: </label>
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button" >Submit</button>
      </form>
    </div>
  );
};

export default Form;
