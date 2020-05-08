package com.distributedtracing.kafkaprocessor.repository;

import com.distributedtracing.kafkaprocessor.model.TracePrototype;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Repository
public interface TracePrototypeRepository extends MongoRepository<TracePrototype, String> {
    //@Query("{'requestId' : '?0'}")
    List<TracePrototype> findAllByRequestId(String requestId);

//    @Query("{ distinct : 'traceLog', key : 'request_id'}")
//    List<String> findDistinctTraceIds();

}

