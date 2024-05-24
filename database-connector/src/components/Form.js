import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ url, username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>URL: </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
