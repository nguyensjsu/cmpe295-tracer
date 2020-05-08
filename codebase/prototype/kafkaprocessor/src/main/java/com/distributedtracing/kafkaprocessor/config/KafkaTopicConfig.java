//package com.distributedtracing.kafkaprocessor.config;
//
//import org.apache.kafka.clients.admin.AdminClientConfig;
//import org.apache.kafka.clients.admin.NewTopic;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.kafka.core.KafkaAdmin;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Configuration
//public class KafkaTopicConfig {
//    @Value(value = "$kafka.bootstrap.servers}")
//    private String bootstrapServer;
//
//    @Value(value = "${kafka.topic}")
//    private String topic;
//
//    @Bean
//    public KafkaAdmin kafkaAdmin() {
//        Map<String, Object> config = new HashMap<>();
//        config.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServer);
//
//        return new KafkaAdmin(config);
//    }
//
//    @Bean
//    public NewTopic topic() {
//        return new NewTopic(topic, 1, (short) 1);
//    }
//}