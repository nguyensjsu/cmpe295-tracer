### Research Papers Summary

**2019-Transparent Tracing of Microservice-based Applications**

- This paper discusses about the challenges of distributed tracing i.e. source code instrumentation and performance overhead.
- The paper proposes a novel approach for tracing microservices which  joins proxies’ usage (for handling tracing concerns) and operating  system syscalls monitoring(for diagnosing causality between multiple  requests).
- The proposal copes with the intrinsic heterogeneity of microservices  by relying on deployment modifications and operating systems mechanisms  solely.
- The ultimate goal of this paper is to preserve application transparency while tracing microservices.
- Unlike Istio, which requires white-box instrumentation to propagate headers, this work leverages linux system calls monitoring to correlate microservice calls. This approach identified the linux system calls made during receiving and sending HTTP calls. These calls along with the tracer module manipulated the hardware syscalls and HTTP headers to propagate tracing information, thus involving no instrumentation.
- Results showed that the performance was similar to white-box tracing tools but
  called for more performance improvements.

**2019-Fault Analysis and Debugging of MicroserviceSystems: Industrial Survey, Benchmark System,and Empirical Study**

- Discusses how microservices are more complex than traditional  distributed systems as they are deployed on 1000s of instances and can  be dynamically created or destroyed.
- Thus, the basic distributed systems tracing methods may not be that relevant for tracing microservices.
- The paper focuses on evaluating the current tracing and  visualization practices on a medium sized benchmark microservice system  (22 microservices).
- The findings asks for more intelligent trace analysis and visualization.

**2018-Nonintrusive Monitoring of Microservice-based Systems**

- The paper proposes an approach to monitor microservices without changing the source code.
- The study utilizes the log gateway activity, to register all calls  to and between microservices, as well as their responses, thus enabling  the extraction of topology and performance metrics, without changing  source code.
- The approach used Netflix Zuul, Ribbon and Eureka which are the gateway, load balancing and scalable registry service respectively.
- The black box monitoring results show that relevant information can  be extracted with negligible effort, where instrumenting modules maybe a  very expensive task.

**2018-Universal Context Propagation for Distributed System Instrumentation**

- The paper proposes a layered architecture for cross-cutting tools  that separates concerns of system developers and tool developers,  enabling independent instrumentation of systems, and the deployment and  evolution of multiple such tools.
- At the system level, it increases the value of instrumenting a  system - ideally at development time – as such instrumentation can be  re-used by many tracing and related tools.
- The solution proposed a layered architecture comprising a tracing plane of baggage context which separates the concerns between tool developers and application developers. The application developers will only care about the propagation of a fixed set of baggage contexts throughout the distributed system, independent of the cross-cutting tracing tool. 
- On the other hand, the tool developers will only focus on the tracing logic using the baggage context and not the context propagation. The study has built the baggage context extending the standards of OpenTracing. Much like Dapper, this separation of concerns in white-box instrumentation, makes the tracing tool development and integration easier.

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
- ShiVector is the first transparent vector timestamp instrumentation, which does not require changing
  the application source code. These logs were then captured and the causal ordering of messages and
  events was inferred from the timestamps. ShiViz visualized them as time space diagrams.
- Developers were now able to understand and debug distributed systems. This was one of the first
  tools that allowed developers to expand, collapse, and hide parts of the diagram depending on the
  context of debugging. But ShiViz was limited in scalability. The tools focus on low-level ordering so much that for understanding a high-level system view, they are not a good choice. Also, ShiViz
  limited studying certain performance characteristics as the orderings were not realtime

**2010-Dapper, a large-scale distributed systems tracing infrastructure**

- One of the first tools for distributed tracing, Dapper by Google.
- It was initially built to be a tracer for google web search but later on used for all Google Systems.
- The paper discusses the architecture of the tool and the problems faced.
- The paper concludes on how the tool maintained application-level  transparency and the future work required to extend to heterogeneous  applications.
- Their model restricted the instrumentation to a small set of libraries, as their environment shared the same threading model, control flow and RPC systems, which maintained the same trace-context. This leveraged Dapper to be a monitoring system which is practically black-box, i.e., transparent to application developers. For trace data collection, the data is first written to local logs, then collected by Dapper daemons and deposited into Google BigTable. 
- Dapper did not capture all traces. By uniform sampling of traces, Google was able to keep Dapper light-weight. Most of the tools today have derived their terminologies and architecture ideas from Dapper for tracing.



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

### Tracing Mind Map

Version 1 - 

![](https://github.com/nguyensjsu/cmpe295-tracer/blob/master/journals/images/initial%20mindmap.png)

More to Investigate ?

* LightStep
* dTrace
* Tracing in JVM

### DTrace

* full-system dynamic tracing framework available in Solaris, FreeBSD, and macOS 
* DTrace can be used to get a global overview of a running system, such as
  the amount of memory, CPU time, filesystem and network resources used 
  by the active processes. It can also provide much more fine-grained 
  information, such as a log of the arguments with which a specific 
  function is being called, or a list of the processes accessing a 
  specific file.
* It is used for kernel tracing.
* Ported for linux but not widely used, instead bpftrace became popular

### BPFTrace

* dtrace not for linux so work on eBPF started
* bpftrace is based on ebpf, *Extended Berkeley Packet Filter*. this was originally developed for filtering network packets. It's a surprisingly similar problem: when a packet is received (an event occurred), you want to perform some sort of administrator-defined action(reject, drop, forward, log, etc). The extended" part refers to the fact eBPF is an improvement on the original Berkeley Packet Filter, in the sense that it's usable outside a networking context.
* With bpftrace you define what events to trace, and what should happen in response. Bpftrace compiles your high-level-bpftrace-language program to eBPF bytecode, listens on events and uploads the bytecode to the kernel.
* Ben Sigleman - Kernel tracing events take a couple of nanoseconds and happen very frequently. In
  DTrace, e.g., you write a script (that looks like an awk script) that takes as input a high-frequency event stream and generates useful statistics. Stack traces trace up the stack. 

References -

* Wiki - https://en.wikipedia.org/wiki/DTrace
* How bpf trace evolved - https://www.joyfulbikeshedding.com/blog/2019-01-31-full-system-dynamic-tracing-on-linux-using-ebpf-and-bpftrace.html

* Ben Sigleman on Distributed Tracing - https://www.computer.org/csdl/magazine/so/2019/01/08611462/17D45WB0qb7

Conclusion - Kernel tracing techniques will again require packet filtering and tracing with system calls intervention. Like in the paper Transparent Tracing of Microservices which used SECCOMP to intervene syscalls related to accepting socket connections and receiving and sending packets at the thread level. This paper work will support Java, Go, C++. Others?

### Tracing in JVM?

Reference - https://openliberty.io/guides/microprofile-opentracing.html

* This article discusses how to enable and customize tracing of JAX-RS and non-JAX-RS methods by using MicroProfile OpenTracing.
* MicroProfile OpenTracing enables distributed tracing in microservices without adding any explicit distributed tracing code to the application. Note that the MicroProfile OpenTracing specification does not address the problem of defining, implementing, or configuring the underlying distributed tracing system. Rather, the specification makes it easy to instrument services with distributed tracing given an existing distributed tracing system.
* This article uses Zipkin as your distributed tracing system. 
* Thoughts - JVM also needs to accept HTTP requests and to read this header information, we might require BPF/SECCOMP in kernel level again? HTTP call hits a microservice on a container running Java application. First request came to the container and due to service running on a port, request is handled by the service on this port, which is the Java code run for this microservice. Where to add instrumentation in JVM? While code begun execution? Needs more investigation.
