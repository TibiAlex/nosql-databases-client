### MONGODB ###
# pentru mongo am un docker-compose.yml

### REDIS ###
docker run --name redis -p 6379:6379 -d redis:latest
# aici se dau comenzi de redis daca doriti
redis-cli INCR mycounter

### CASSANDRA ###
docker network create cassandra
docker run --rm -d --name cassandra --hostname cassandra --port 9000 --network cassandra cassandra:latest
# ca sa dati comenzi de cassandra dati urmatoarea comanda, acolo puteti da comenzi ca cele din fisierul data.cql
docker run --rm -it --network cassandra nuvo/docker-cqlsh cqlsh cassandra 9042 --cqlversion='3.4.6'

### ELASTICSEARCH ###
docker network create elastic
docker run --name es01 --net elastic -p 9200:9200 -e ELASTIC_USERNAME=elastic -e ELASTIC_PASSWORD=-0x5F9VVsj9ooC5e0WOt  -it elasticsearch:8.9.0

### NEO4J ###
docker run -d --name neo4j --publish=7474:7474 --publish=7687:7687 --volume=$HOME/neo4j/data:/data --env=NEO4J_AUTH=none neo4j:latest

SA NU FACETI UN SINGUR DOCKER COMPOSE PENTRU TOATE, NUMAI ELASTICSEARCH CONSUMA 4GB RAM
