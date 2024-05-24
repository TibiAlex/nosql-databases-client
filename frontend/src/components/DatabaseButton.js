import React from 'react';
import { useNavigate } from 'react-router-dom';

import mongoImg from '../images/mongo.jpg';
import redisImg from '../images/redis.jpg';
import cassandraImg from '../images/cassandra.jpg';
import elasticsearchImg from '../images/elasticsearch.jpg';
import neo4jImg from '../images/neo4j.jpg';

const dbImages = {
  MongoDB: mongoImg,
  Redis: redisImg,
  Cassandra: cassandraImg,
  ElasticSearch: elasticsearchImg,
  Neo4j: neo4jImg,
};

const DatabaseButton = ({ name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${name.toLowerCase()}`);
  };

  return (
    <button className="database-button" onClick={handleClick}>
      <img src={dbImages[name]} alt={`${name} logo`} className="database-button-img" />
      <span className="database-button-text">{name}</span>
    </button>
  )
};

export default DatabaseButton;
