package com.distributedtracing.kafkaprocessor.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Document(collection = "traceLog")
public class TracePrototype {
    @JsonProperty("request_id")
    String requestId;
    String downstream_remote_address;
    String authority;
    String path;
    String protocol;
    String upstream_service_time;
    String upstream_local_address;
    String duration;
    String upstream_transport_failure_reason;
    String route_name;
    String downstream_local_address;
    String user_agent;
    String response_code;
    String response_flags;
    String start_time;
    String method;
    String upstream_host;
    String x_forwarded_for;
    String bytes_sent;
    String upstream_cluster;

    public TracePrototype() {
    }

    @Override
    public String toString() {
        return "TracePrototype{" +
                "requestId='" + requestId + '\'' +
                ", downstream_remote_address='" + downstream_remote_address + '\'' +
                ", authority='" + authority + '\'' +
                ", path='" + path + '\'' +
                ", protocol='" + protocol + '\'' +
                ", upstream_service_time='" + upstream_service_time + '\'' +
                ", upstream_local_address='" + upstream_local_address + '\'' +
                ", duration='" + duration + '\'' +
                ", upstream_transport_failure_reason='" + upstream_transport_failure_reason + '\'' +
                ", route_name='" + route_name + '\'' +
                ", downstream_local_address='" + downstream_local_address + '\'' +
                ", user_agent='" + user_agent + '\'' +
                ", response_code='" + response_code + '\'' +
                ", response_flags='" + response_flags + '\'' +
                ", start_time='" + start_time + '\'' +
                ", method='" + method + '\'' +
                ", upstream_host='" + upstream_host + '\'' +
                ", x_forwarded_for='" + x_forwarded_for + '\'' +
                ", bytes_sent='" + bytes_sent + '\'' +
                ", upstream_cluster='" + upstream_cluster + '\'' +
                '}';
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String request_id) {
        this.requestId = request_id;
    }

    public String getDownstream_remote_address() {
        return downstream_remote_address;
    }

    public void setDownstream_remote_address(String downstream_remote_address) {
        this.downstream_remote_address = downstream_remote_address;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getProtocol() {
        return protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String getUpstream_service_time() {
        return upstream_service_time;
    }

    public void setUpstream_service_time(String upstream_service_time) {
        this.upstream_service_time = upstream_service_time;
    }

    public String getUpstream_local_address() {
        return upstream_local_address;
    }

    public void setUpstream_local_address(String upstream_local_address) {
        this.upstream_local_address = upstream_local_address;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getUpstream_transport_failure_reason() {
        return upstream_transport_failure_reason;
    }

    public void setUpstream_transport_failure_reason(String upstream_transport_failure_reason) {
        this.upstream_transport_failure_reason = upstream_transport_failure_reason;
    }

    public String getRoute_name() {
        return route_name;
    }

    public void setRoute_name(String route_name) {
        this.route_name = route_name;
    }

    public String getDownstream_local_address() {
        return downstream_local_address;
    }

    public void setDownstream_local_address(String downstream_local_address) {
        this.downstream_local_address = downstream_local_address;
    }

    public String getUser_agent() {
        return user_agent;
    }

    public void setUser_agent(String user_agent) {
        this.user_agent = user_agent;
    }

    public String getResponse_code() {
        return response_code;
    }

    public void setResponse_code(String response_code) {
        this.response_code = response_code;
    }

    public String getResponse_flags() {
        return response_flags;
    }

    public void setResponse_flags(String response_flags) {
        this.response_flags = response_flags;
    }

    public String getStart_time() {
        return start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getUpstream_host() {
        return upstream_host;
    }

    public void setUpstream_host(String upstream_host) {
        this.upstream_host = upstream_host;
    }

    public String getX_forwarded_for() {
        return x_forwarded_for;
    }

    public void setX_forwarded_for(String x_forwarded_for) {
        this.x_forwarded_for = x_forwarded_for;
    }

    public String getBytes_sent() {
        return bytes_sent;
    }

    public void setBytes_sent(String bytes_sent) {
        this.bytes_sent = bytes_sent;
    }

    public String getUpstream_cluster() {
        return upstream_cluster;
    }

    public void setUpstream_cluster(String upstream_cluster) {
        this.upstream_cluster = upstream_cluster;
    }
}