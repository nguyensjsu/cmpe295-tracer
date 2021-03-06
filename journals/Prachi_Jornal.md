# Literature Review

## 2019- A Microservice Reference Case Study for Design-Runtime Interaction in MDE

- This paper a reference case study for a microservices based Train Ticket application is presented for Model driven Engineering (MDE).
- The case study is composed of set of software modeling artifacts designed in UML, a dataset of monitoring logs, and a set of design-runtime correspondence defined as traceability links
- The monitoring infrastructure generates and collects runtime information in the form of traces. A trace consists of a series of casually related events that are triggered by a request as it moves through a distributed system.These events are called spans and they represent a timed operation occurring in a component.
- Spans contain references to other spans, which allow a trace to be assembled as a complete workflow.

Example trace log:
![alt text](https://github.com/nguyensjsu/cmpe295-tracer/blob/master/journals/images/2019_A%20Microservice%20Reference%20Case%20Study%20for%20Design%20Runtime%20Interaction%20in%20MDE_tracelog.jpg)

- Log is characterized by a set of Traces representing the requests the system served during the monitoring period. Each Trace consists of a set of Spans representing execution events. A Span is defined by the following attributes: a timestamp at which the execution started, its duration in microseconds, and kind specifying the role of the call in the scenario (SERVER, CLIENT, or undefined for internal calls). Each Span has a reference to a Service, that is the component providing the operation, and a reference to the mapped EndPoint.

- Runtime log models are then used along with the UML to define design-runtime specifications using Janus Transformation Language(JTL) framework.


## 2019-JCallGraph: Tracing Microservices in Very Large Scale Container Cloud Platforms
- a tracing and analytics tool to capture and visualize the microservice invocation relationship of tens of thousands of microservices with millions of containers at JD.com
- This paper focuses on three main goals for tracing and debugging: online microservices invocation construction within milliseconds, minimal overhead without any significant performance impact on real-production applications, and application-agnostic with zero-intrusion to application.
- JCallGraph can accurately capture the realtime invocation relationship at massive scale and help developers to efficiently
understand interactions among microservices, pinpoint root-cause of problems.
- Distributed dynamic tracing to provide a holistic view of both physical and logical invocation chains for large-scale microservice-based applications in an enterprise cloud platform with millions of containers.
– Careful intrusion of core middlewares to eliminate active involvement of applications; short UUID, low rate sampling and high compression context to increase the performance and scalability of the system.
- Two types of identifiers are used to represent the runtime invocation relationship for the applications and microservices: static identifiers (e.g., application ID,microservice ID) which are generated when the application and the microservice registered; and dynamic identifiers (e.g., global logical chain ID, RPC ID) which are generated during the runtime. In addition, since the invocation relationship is similar to a tree, the detailed structure of an invocation tree is recorded, such as the entry, parent, current node using these identifiers.
- Four main components are used: (1) Trace Layer, tracing the invocation relationship in the middlewares (e.g., JSF, JMQ, JIMDB etc.); (2) Transfer Layer, transferring the traced invocation information to storages; (3) Storage Layer, storing the realtime data in JIMDB and offline analytic data in Elasticsearch1 (4) Visualization and Analytics Layer, visualizing and deeply analyzing the microservices and their invocation relationship.
- Use cases: Microservice Visualization, Root Cause Analysis, Invocation Dependency Analysis.

## 2019- Microservices Monitoring with Event Logs and Black Box Execution Tracing
- This paper proposes a novel approach to accompany microservices logs with black box tracing to help practitioners in making informed decisions for troubleshooting.
- The approach is based on the passive tracing of request-response messages of the REpresentational State Transfer (REST) communication model.
- Two case studies have been presented: Clearwater IP Multimedia Subsystem (IMS) setup consisting of Docker microservices and a Kubernetes orchestrator deployment hosting tens of microservices.
- It relies on Passive tracing, i.e., the interception of packets passing through a network, requires no changes to the target software; as such, it is application-transparent. Format of the trace is as follows:
Timestamp , Method , URL , Src_IP , Src_Port , Dest_IP , Dest_Port , Response_Code , Completion_Time , Info
- An average reduction of around 59% in log size, at 3.3% higher performance overhead when compared to the collection of buitlin logs

## 2018- An Approach to Extract the Architecture of Microservice-Based Software Systems
- The main characteristics of the approach are the collection of static and dynamic information from services, the aggregation of collected runtime information, and the combination of static and runtime information.
- A configurable aggregation function condenses the captured runtime information to a single dimension, enabling analysis of the evolution of the architecture over a longer period of time. The static service information, like service and API descriptions, is combined with infrastructure-related and runtime information.
- The dashboard is used to create several visualization components that offer detailed information on individual services and on the overall system architecture, which is useful for documentation purposes. The defined visualizations are also useful for identifying design drawbacks, such as strong coupling between services, or other potential areas of architectural improvement.
- This implementation is only limited to RESTful services.

## A Trace Agent with Code No-invasion Based on ByteCode Enhancement Technology
- This paper proposes a trace agent specifically for java language by instrumenting the byte code of the compiled jar.
- The trace agent acquires trace logs without invading the code
- Some parameters needs to be added when starting the service module in order to gather traces transparently.
- This research is inspired from Google Dapper and Zipkin
Steps:
1. Use --javagent parameter when executing jar package to provide the agent.jar path
2. Use the class loader to load the jar of the agent, each time the newly loaded class is enhanced by the code of the agent.
3. Premain method of the agent is executed to add instrumentation and add transformations. Class loader needs to call back before each class is loaded.
4. Execute the main method of the class.

Trace Data Strucure
| Name        | Description                                 |  
|-------------|---------------------------------------------|
|traceld      | Recording call chain unique identifier      |
|rpcId        | Recording node path relation                |
|traceName    | Recording request uri                       |  
|invokerName  | Recording request upstream nodeservice name |
|serviceName  | Recording request service name              |
|methodName   | Recording request method name               |
|rpcType      | Recording RPC type                          |
|resultType   | Recording result type                       |  
|isRoot       | Recording whether current node is root or not|
|startTime    | Recording request start time                |
|endTime      | Recording request end time                  |
|ip           | Recording IP address                        |
|pid          | Recording process id                        |
|logs         | Recording additional information            |
|product      | Recording product name                      |
|url          | Recording request url                       |

Algorithm:
RpcContext class contains the trace data structure. There is a counter inside to guarantee the order of the RPC request. Inside the main program, when there are multiple child threads processing the request, the child thread inherits RpcContextThreadLocal of current parent. The RpcContextThreadLocal of the thread ensures that the information of parent thread can interact with the child thread.

l: function BEFOREMETHOD
2: if isNewTrace then
3:      clientSend()
4: else
5:      serverRecv()
6: end if
7: end function
8: function CLIENTSEND
9: if hasParentContextQ then
10:     childContext <— createChildContextQ
11: else
12:     startTrace()
13: end if
14: end function
15: function SERVERRECV
16: if validate (traceld) then
17:       startTrace()
18:       send()
19: else
20:   break
21: end if
22: end function

The interceptor intercepts a method, and then determine whether it is a new trace. If it is a new trace, it will execute the clientSend method. The method sends an RPC call downstream. The current thread needs to have rpcContext, otherwise a trace will be created. If not, it will execute the serverRecv method, which receives the RPC call sent upstream and returns the processing result to the upstream after execution. Finally, it releases the current rpcContext. After the algorithm is executed, the construction of the trace will be completed. It will involve a traceId to ensure consistency in a distributed system. For instance, in case of HTTP to initiate a call between modules, the traceId can be in the HTTP header to ensure that the submodule can receive the traceId. If an RPC call is used, the traceId can be serialized to the submodule through the serialization protocol to ensure consistency. The trace data collected will be sent to the collector of the tracking system.


## 2014-JBInsTrace A tracer of Java and JRE classes at basic-block granularity by dynamically instrumenting bytecode
- JBInsTrace uses dynamic instrumentation instead of static instrumentation of code as static instrumentation would require transforming all classes that may or may not be used during execution. Dynamic instrumentation only the classes required during execution.
- The premain method is a method called by the Java agent before the main method of the application but after the JVM has initialized. JBInsTrace uses premain to register its class transformer (Instrumentor) which will be applied on all future class definitions.The instrumentation must not add, remove or rename fields or methods, change the signatures
of methods, or change inheritance.
- Several tools and libraries exist to instrument bytecode but the ASM framework is chosen in this paper which provides libraries to parse Java classes and add bytecode, allowing complex transformations, with very low memory requirements.
- Unique identifiers are assigned to each class, method and basic block. Static information is extracted from the class source code and the class is instrumented with new bytecodes.
- This tool uses event number, to encode 3 pieces of information:
• The 2 most significant bits encode the event type identifier: method start, method end, basic block execution.
• The 19 bits in the middle encode the unique identifier of the method.
• If the event type is the execution of a basic block, the 11 least significant bits represent the unique identifier of the basic
block within the method (unused otherwise).
- Every time an event occurs, the instrumented code calls the Tracer (via the notifyEvent static method) and passes it the associated event number and the current thread id.
- JBInsTrace tracer provides files that contain the exact control flow of each thread at basic block level, plus static information about these basic blocks. This information is used by trace analyzer.
- Each event of the trace is related to its static information saved and re-simulate the execution call stack to compute dynamic metrics.
- ArgoUML v0.28, is used for loading UML diagrams.
- There are some major performance impacts of using this tool hence should be used only when speed isn't the priority.



# Industry Tools

## OpenTracing (Whitebox Instrumentation)
- Traces in OpenTracing are defined implicitly by their Spans. In particular, a Trace can be thought of as a directed acyclic graph (DAG) of Spans, where the edges between Spans are called References.
- It uses Jaeger tracing backend and hence requires a jaeger docker image running.
- According to the OpenTracing specification, a span always contains a set of basic information: the name of the operation, the name of the component providing the operation, the start timestamp and duration (or, alternatively, the finish timestamp), the role of the span in the request and a set of user-defined annotations called tags.
- https://github.com/opentracing

## JCallGraph
- A tracing and analytics tool to visualize the microservice invocation graph for massive scale microservice platform in enterprise datacenter.
-JCallGraph can accurately capture the real-time invocation relationship among tens of thousands of microservices in millions of containers, one of the largest Kubernetes clusters in real production in the world, while achieving minimal overhead without any significant performance impact on real-production applications, and zero-intrusion to the code of applications.
JCall-Graph also leverages sampling to dramatically reduce the overhead of the system. Efficient log transfer layer and in-memory storage layer are integrated to ensure real time analysis and visualization. JCallGraph provides better understanding of the system such as analyzing complex execution paths across microservices. Other functionalities include timing and bottleneck analysis, analyzing statistics of calling information or the entrance points, and analyzing the dependencies within an invocation chain.

## CloudProber (Blackbox)
- Cloudprober is a black-box monitoring software. It employs an “active” monitoring model. It runs probes against (or on) the components of your systems to verify that they are working as expected. Example probes include a probe that verifies that your frontend VMs can reach your backend VMs and a probe that verifies the connectivity between Cloud VMs and on-premise systems.
- Integrated with Prometheus and Grafana to display results.
- Built-in implementations for the most common probe types: PING, HTTP, UDP, DNS.
- https://github.com/google/cloudprober

# Design and Implementation

## Database design in Mongo

![alt text](https://github.com/nguyensjsu/cmpe295-tracer/blob/master/journals/images/MongoDBSructure_1.png)

## Kafka setup in docker

1. Create Docker Network named kafka-net
docker network create kafka-net --driver bridge

2. Run Zookeeper using existing image (Bitnami)

docker run --name zookeeper-server -p 2181:2181 --network kafka-net -e ALLOW_ANONYMOUS_LOGIN=yes bitnami/zookeeper:latest -d

3. Test if zookeeper is running
telnet localhost 2181

4. Run Kafka Broker and expose port 9092
docker run --name kafka-server1 --network kafka-net -e ALLOW_PLAINTEXT_LISTENER=yes -e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper-server:2181 -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -p 9092:9092 bitnami/kafka:latest -deployment

5. Add more brokers if needed and change the exposed port
docker run --name kafka-server2 --network kafka-net -e ALLOW_PLAINTEXT_LISTENER=yes -e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper-server:2181 -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9093 -p 9093:9092 bitnami/kafka:latest -d

6. List topics
docker exec -t kafka-server1 \
  kafka-topics.sh \
    --bootstrap-server :9092 \
    --list

7. Create topic
docker exec -t kafka-server1 \
  kafka-topics.sh \
    --bootstrap-server :9092 \
    --create \
    --topic test \
    --partitions 1 \
    --replication-factor 1


