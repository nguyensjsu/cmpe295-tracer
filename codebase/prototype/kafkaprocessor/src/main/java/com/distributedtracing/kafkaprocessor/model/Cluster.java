package com.distributedtracing.kafkaprocessor.model;

public class Cluster {
    String reporter;
    String requestId;
    String requestedServerName;
    Source source;
    Destination destination;

    public String getReporter() {
        return reporter;
    }

    public void setReporter(String reporter) {
        this.reporter = reporter;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public String getRequestedServerName() {
        return requestedServerName;
    }

    public void setRequestedServerName(String requestedServerName) {
        this.requestedServerName = requestedServerName;
    }

    public Source getSource() {
        return source;
    }

    public void setSource(Source source) {
        this.source = source;
    }

    public Destination getDestination() {
        return destination;
    }

    public void setDestination(Destination destination) {
        this.destination = destination;
    }

    @Override
    public String toString() {
        return "Cluster{" +
                "reporter='" + reporter + '\'' +
                ", requestId='" + requestId + '\'' +
                ", requestedServerName='" + requestedServerName + '\'' +
                ", source=" + source +
                ", destination=" + destination +
                '}';
    }
}
