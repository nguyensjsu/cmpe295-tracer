package com.distributedtracing.kafkaprocessor.service;

import com.distributedtracing.kafkaprocessor.consumer.KafkaConsumer;
import com.distributedtracing.kafkaprocessor.model.TracePrototype;
import com.distributedtracing.kafkaprocessor.repository.TracePrototypeRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TraceService {
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(TraceService.class);
    @Autowired
    TracePrototypeRepository tracePrototypeRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    public List<TracePrototype> getAllTracesForTraceId(String traceId){
        logger.info("Trace id is ",traceId);
        System.out.println("---------------------TraceId------------------------"+traceId);
        return tracePrototypeRepository.findAllByRequestId(traceId);

    }

    public List<String> getAllUniqueTraces(){

        List<String> traceId = mongoTemplate.query(TracePrototype.class).distinct("requestId").as(String.class).all();
        return traceId;

    }
}
