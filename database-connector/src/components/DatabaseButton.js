import React from 'react';
import { useNavigate } from 'react-router-dom';

const DatabaseButton = ({ name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${name.toLowerCase()}`);
  };

  return <button onClick={handleClick}>{name}</button>;
};

export default DatabaseButton;
