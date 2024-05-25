import React, { useState } from 'react';
import './Form.css';

const Form = ({ onSubmit }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
        console.error('No file selected');
        return;
    }
    
    onSubmit(file);
  };

  return (
    <div className="form-container">
      <h2>Upload A Query File JSON</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fileInput">Choose File:</label>
          <input type="file" id="fileInput" onChange={handleFileChange} />
        </div>
        <button type="submit" className="submit-button">Upload</button>
      </form>
    </div>
  );
};

export default Form;
