package com.distributedtracing.kafkaprocessor.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "traceLog")
public class TraceLog {
    Cluster cluster;
    Metadata metadata;

    public Cluster getCluster() {
        return cluster;
    }

    public void setCluster(Cluster cluster) {
        this.cluster = cluster;
    }



    public Metadata getMetadata() {
        return metadata;
    }

    public void setMetadata(Metadata metadata) {
        this.metadata = metadata;
    }

    @Override
    public String toString() {
        return "TraceLog{" +
                "cluster=" + cluster +
                ", metadata=" + metadata +
                '}';
    }
}
