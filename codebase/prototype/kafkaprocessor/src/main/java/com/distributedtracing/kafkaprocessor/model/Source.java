package com.distributedtracing.kafkaprocessor.model;

public class Source {
    String sourceApp;
    String sourceIp;
    String sourceName;
    String sourceNamespace;
    String sourceOwner;
    String sourcePrincipal;
    String sourceWorkload;

    public String getSourceApp() {
        return sourceApp;
    }

    public void setSourceApp(String sourceApp) {
        this.sourceApp = sourceApp;
    }

    public String getSourceIp() {
        return sourceIp;
    }

    public void setSourceIp(String sourceIp) {
        this.sourceIp = sourceIp;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getSourceNamespace() {
        return sourceNamespace;
    }

    public void setSourceNamespace(String sourceNamespace) {
        this.sourceNamespace = sourceNamespace;
    }

    public String getSourceOwner() {
        return sourceOwner;
    }

    public void setSourceOwner(String sourceOwner) {
        this.sourceOwner = sourceOwner;
    }

    public String getSourcePrincipal() {
        return sourcePrincipal;
    }

    public void setSourcePrincipal(String sourcePrincipal) {
        this.sourcePrincipal = sourcePrincipal;
    }

    public String getSourceWorkload() {
        return sourceWorkload;
    }

    public void setSourceWorkload(String sourceWorkload) {
        this.sourceWorkload = sourceWorkload;
    }

    @Override
    public String toString() {
        return "Source{" +
                "sourceApp='" + sourceApp + '\'' +
                ", sourceIp='" + sourceIp + '\'' +
                ", sourceName='" + sourceName + '\'' +
                ", sourceNamespace='" + sourceNamespace + '\'' +
                ", sourceOwner='" + sourceOwner + '\'' +
                ", sourcePrincipal='" + sourcePrincipal + '\'' +
                ", sourceWorkload='" + sourceWorkload + '\'' +
                '}';
    }
}
