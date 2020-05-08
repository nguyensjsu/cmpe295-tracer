package com.distributedtracing.kafkaprocessor.producer;

import com.distributedtracing.kafkaprocessor.model.TraceLog;
import com.distributedtracing.kafkaprocessor.model.TracePrototype;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducer {
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(KafkaProducer.class);

    @Value(value = "${kafka.topic}")
    private String topic;

    @Autowired
    private KafkaTemplate<String, TracePrototype> kafkaTemplate;

    public void sendMessage(TracePrototype message) {
        logger.info(String.format("Logging-----------  Producer topic  %s", topic));
        logger.info(String.format("Logging-----------  Producing message -> %s", message));
        this.kafkaTemplate.send(topic, message);
    }
}
