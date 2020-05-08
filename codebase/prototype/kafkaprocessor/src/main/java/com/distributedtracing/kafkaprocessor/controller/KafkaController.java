package com.distributedtracing.kafkaprocessor.controller;

import com.distributedtracing.kafkaprocessor.consumer.KafkaConsumer;
import com.distributedtracing.kafkaprocessor.model.TraceLog;
import com.distributedtracing.kafkaprocessor.model.TracePrototype;
import com.distributedtracing.kafkaprocessor.producer.KafkaProducer;
import com.distributedtracing.kafkaprocessor.service.TraceService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/")
public class KafkaController {

    private final KafkaProducer producer;
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(KafkaController.class);
    @Autowired
    KafkaController(KafkaProducer producer) {
        this.producer = producer;
    }

    @Autowired
    TraceService traceService;

     @PostMapping(value = "/publish")
     public void sendMessageToKafkaTopic(@RequestBody TracePrototype message) {
     this.producer.sendMessage(message);
    }

    @RequestMapping(value = "/traces/{id}",method = RequestMethod.GET)
    public List<TracePrototype> getTraces(@PathVariable String id) {
         logger.info("Querying trace id in controller",id);
         System.out.println("---------------------Id------------------------"+id);
        return traceService.getAllTracesForTraceId(id);
    }

    @RequestMapping(value = "/traces",method = RequestMethod.GET)
    public List<String> getTraces() {

        return traceService.getAllUniqueTraces();
    }
}