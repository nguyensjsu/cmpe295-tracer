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



# Industry Tools

## OpenTracing
- According to the OpenTracing specification, a span always contains a set of basic information: the name of the operation, the name of the component providing the operation, the start timestamp and duration (or, alternatively, the finish timestamp), the role of the span in the request and a set of user-defined annotations called tags.

## JCallGraph
- A tracing and analytics tool to visualize the microservice invocation graph for massive scale microservice platform in enterprise datacenter.
-JCallGraph can accurately capture the real-time invocation relationship among tens of thousands of microservices in millions of containers, one of the largest Kubernetes clusters in real production in the world, while achieving minimal overhead without any significant performance impact on real-production applications, and zero-intrusion to the code of applications.
JCall-Graph also leverages sampling to dramatically reduce the overhead of the system. Efficient log transfer layer and in-memory storage layer are integrated to ensure real time analysis and visualization. JCallGraph provides better understanding of the system such as analyzing complex execution paths across microservices. Other functionalities include timing and bottleneck analysis, analyzing statistics of calling information or the entrance points, and analyzing the dependencies within an invocation chain.

