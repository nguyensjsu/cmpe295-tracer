### Research Papers Summary

**2019-Transparent Tracing of Microservice-based Applications**

- This paper discusses about the challenges of distributed tracing i.e. source code instrumentation and performance overhead.
- The paper proposes a novel approach for tracing microservices which  joins proxies’ usage (for handling tracing concerns) and operating  system syscalls monitoring(for diagnosing causality between multiple  requests).
- The proposal copes with the intrinsic heterogeneity of microservices  by relying on deployment modifications and operating systems mechanisms  solely.
- The ultimate goal of this paper is to preserve application transparency while tracing microservices.

**2019-Fault Analysis and Debugging of MicroserviceSystems: Industrial Survey, Benchmark System,and Empirical Study**

- Discusses how microservices are more complex than traditional  distributed systems as they are deployed on 1000s of instances and can  be dynamically created or destroyed.
- Thus, the basic distributed systems tracing methods may not be that relevant for tracing microservices.
- The paper focuses on evaluating the current tracing and  visualization practices on a medium sized benchmark microservice system  (22 microservices).
- The findings asks for more intelligent trace analysis and visualization.

**2018-Nonintrusive Monitoring of Microservice-based Systems**

- The paper proposes an approach to monitor microservices without changing the source code.
- The study utilizes the log gateway activity, to register all calls  to and between microservices, as well as their responses, thus enabling  the extraction of topology and performance metrics, without changing  source code.
- The black box monitoring results show that relevant information can  be extracted with negligible effort, where instrumenting modules maybe a  very expensive task.

**2018-Universal Context Propagation for Distributed System Instrumentation**

- The paper proposes a layered architecture for cross-cutting tools  that separates concerns of system developers and tool developers,  enabling independent instrumentation of systems, and the deployment and  evolution of multiple such tools.
- At the system level, it increases the value of instrumenting a  system - ideally at development time – as such instrumentation can be  re-used by many tracing and related tools.

**2017-Inferring Calling Relationship Based on External Observation for Microservice Architecture**

- This paper proposes a way to find calling relationships between  microservices in order to find the root cause analysis of a failure.
- To do so, the paper uses communication logs observed outside the services, such as sender, receiver, and timestamp.
- The method assumes that each message is triggered by another  message, and infers the trigger message considering scalability and  agility of the microservice architecture.

**2017-Tracing and Debugging Distributed Systems; Programming by Examples**

- This paper is a survey on recent techniques for debugging  distributed systems with a conclusion that the state-of-the-art of  debugging distributed systems is still in its infancy.
- The paper talks about some old and newer forms of distributed tracing.

**2016-Debugging distributed systems**

- This paper presents a state-of-the-art debugging and visualization tool ShiViz.
- It  visualizes  distributed  system executions as interactive  time-space diagrams that explicitly capture distributed ordering of  events in the system.

**2010-Dapper, a large-scale distributed systems tracing infrastructure**

- One of the first tools for distributed tracing, Dapper by Google.
- It was initially built to be a tracer for google web search but later on used for all Google Systems.
- The paper discusses the architecture of the tool and the problems faced.
- The paper concludes on how the tool maintained application-level  transparency and the future work required to extend to heterogeneous  applications.



### Industry Tools

**Jaeger**

Inspired by Dapper(Google) and Zipkin, developed by Uber

White box instrumentation of code

Used for tracing microservice-based distributed systems which includes Distributed Context Propagation, Distributed transaction monitoring, Root Cause Analysis, Service Dependancy Analysis, Performance or latency optimization.

Built on OpenTracing API standards/specification

Span - logical unit of work of an operation 

Trace - DAG of spans, which tells a story of a transaction workflow  as it propagates in a distributed system

Launching a Jaeger all in one docker container:

```
docker run -d --name jaeger \
    -p 6831:6831/udp \
    -p 16686:16686 \
    -p 14268:14268 \
    jaegertracing/all-in-one:1.6
   
Ports:
6831/udp, is used to receive tracing data from applications instrumented with Jaeger tracers
16686, is where we can find the web UI (http://localhost:16686)
14268, in case we have issues with UDP packet limits and need to use HTTP transport for sending traces
```

Launching sample microservice application HotROD: (4 microservices)

Hot ROD is a simple ride sharing application.

```
docker run --rm -it \
    --link jaeger \
    -p8080-8083:8080-8083 \
    jaegertracing/example-hotrod:1.6 \
    all \
    --jaeger-agent.host-port=jaeger:6831
    
Application frontend on http://localhost:8080

"link" flag tells Docker to make the hostname jaeger available inside the container's networking namespace and resolve it to the Jaeger backend
"jaeger-agent.host-port=jaeger:6831" tells the HotROD application to configure the tracer to send data to UDP port 6831 on hostname jaeger
```

Jaeger has a distinct feature of **contextualized logs**, meaning they are captured not only in the context of a specific request, but also in the context of a specific span within the trace for that request.

The Jaeger UI shows the time sequence diagrams of the spans over the 4 microservices. These spans also show the contextualized logs, request details, latency of each span.

If there are many requests, the UI also shows the bottleneck application, for ex in this use case the mysql query.

The tracing metadata like request ids are propagated not with the request params but by making the data transparently available using Open Tracing instrumentation.

**Agent-based instrumentation** - inject trace points automatically, without changes to the application itself.

