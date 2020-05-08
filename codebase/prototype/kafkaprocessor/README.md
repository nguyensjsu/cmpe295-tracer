# Kafka deployment on Docker:

1. Create Docker Networknamed kafka-net
sudo docker network create kafka-net --driver bridge

2. Run Zookeeper using existing image (Bitnami)

sudo docker run --name zookeeper-server -p 2181:2181 --network kafka-net -e ALLOW_ANONYMOUS_LOGIN=yes bitnami/zookeeper:latest -d 

3. Test if zookeeper is running
telnet localhost 2181

4. Run Kafka Broker and expose port 9092
sudo docker run --name kafka-server1 --network kafka-net -e ALLOW_PLAINTEXT_LISTENER=yes -e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper-server:2181 -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -p 9092:9092 bitnami/kafka:latest -deployment

5. Add more brokers if needed and change the exposed port
sudo docker run --name kafka-server2 --network kafka-net -e ALLOW_PLAINTEXT_LISTENER=yes -e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper-server:2181 -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9093 -p 9093:9092 bitnami/kafka:latest -d

6. List topics
sudo docker exec -t kafka-server1 \
  kafka-topics.sh \
    --bootstrap-server :9092 \
    --list
	
7. Create topic
sudo docker exec -t kafka-server1 \
  kafka-topics.sh \
    --bootstrap-server :9092 \
    --create \
    --topic traces \
    --partitions 1 \
    --replication-factor 1
    
 # Backend application
 
 1. Update application.properties in src/main/resources/application.properties
 2. Run mvn clean package
