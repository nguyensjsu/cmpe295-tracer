FROM java:8
EXPOSE 9090
ADD /target/kafkaprocessor-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
