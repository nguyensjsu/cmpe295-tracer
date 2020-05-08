package com.distributedtracing.kafkaprocessor.model;

import com.fasterxml.jackson.databind.JsonNode;

public class Metadata {
    JsonNode request;
    JsonNode response;

    public JsonNode getRequest() {
        return request;
    }

    public void setRequest(JsonNode request) {
        this.request = request;
    }

    public JsonNode getResponse() {
        return response;
    }

    public void setResponse(JsonNode response) {
        this.response = response;
    }

    @Override
    public String toString() {
        return "Metadata{" +
                "request=" + request +
                ", response=" + response +
                '}';
    }
}
