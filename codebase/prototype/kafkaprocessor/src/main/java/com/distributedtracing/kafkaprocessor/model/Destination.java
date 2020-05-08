package com.distributedtracing.kafkaprocessor.model;

public class Destination {
    String destinationApp;
    String destinationIp;
    String destinationName;
    String destinationNamespace;
    String destinationOwner;
    String destinationPrincipal;
    String destinationWorkload;

    public String getDestinationApp() {
        return destinationApp;
    }

    public void setDestinationApp(String destinationApp) {
        this.destinationApp = destinationApp;
    }

    public String getDestinationIp() {
        return destinationIp;
    }

    public void setDestinationIp(String destinationIp) {
        this.destinationIp = destinationIp;
    }

    public String getDestinationName() {
        return destinationName;
    }

    public void setDestinationName(String destinationName) {
        this.destinationName = destinationName;
    }

    public String getDestinationNamespace() {
        return destinationNamespace;
    }

    public void setDestinationNamespace(String destinationNamespace) {
        this.destinationNamespace = destinationNamespace;
    }

    public String getDestinationOwner() {
        return destinationOwner;
    }

    public void setDestinationOwner(String destinationOwner) {
        this.destinationOwner = destinationOwner;
    }

    public String getDestinationPrincipal() {
        return destinationPrincipal;
    }

    public void setDestinationPrincipal(String destinationPrincipal) {
        this.destinationPrincipal = destinationPrincipal;
    }

    public String getDestinationWorkload() {
        return destinationWorkload;
    }

    public void setDestinationWorkload(String destinationWorkload) {
        this.destinationWorkload = destinationWorkload;
    }

    @Override
    public String toString() {
        return "Destination{" +
                "destinationApp='" + destinationApp + '\'' +
                ", destinationIp='" + destinationIp + '\'' +
                ", destinationName='" + destinationName + '\'' +
                ", destinationNamespace='" + destinationNamespace + '\'' +
                ", destinationOwner='" + destinationOwner + '\'' +
                ", destinationPrincipal='" + destinationPrincipal + '\'' +
                ", destinationWorkload='" + destinationWorkload + '\'' +
                '}';
    }
}
