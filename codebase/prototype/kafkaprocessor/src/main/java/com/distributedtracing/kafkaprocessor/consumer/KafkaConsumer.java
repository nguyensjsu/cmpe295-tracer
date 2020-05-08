package com.distributedtracing.kafkaprocessor.consumer;

import com.distributedtracing.kafkaprocessor.AppConfig;
import com.distributedtracing.kafkaprocessor.model.TracePrototype;
import com.distributedtracing.kafkaprocessor.repository.TracePrototypeRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;

public class KafkaConsumer {
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(KafkaConsumer.class);


    @Autowired
    TracePrototypeRepository traceLogPrototype;


    @KafkaListener(topics = "traces", groupId = AppConfig.GROUP_ID, containerFactory = "userKafkaListenerFactory")
    public TracePrototype consumeJson(TracePrototype message) {
        logger.info(String.format("Logging-----------  Consuming message -> %s", message));
        traceLogPrototype.save(message);
        return message;
    }
}
