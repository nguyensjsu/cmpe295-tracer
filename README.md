#  Distributed Tracer
Distributed Tracing of Microservices

Distributed tracing is a method of monitoring and profiling applications, by tracing a request along the services it hits. This keeps an application reliable, observable and identifying failures of services easier. According to a research conducted by Camunda involving 354 enterprises, the outcome shows that 63% of the companies are using microservices and many more are planning to adopt them. Industry today is limited to utilizing centralized logs and transaction metrics as a part of Application and Performance Monitoring(APM) and does not provide a complete view of the distributed system. This makes finding the root cause of a failure difficult making distributed tracing of microservices significant.

Microservices can be deployed on thousands of instances and can be dynamically created/destroyed which makes its tracing complex. The tools used in industry today like Jaeger, Zipkin etc. are limited in tracing and monitoring of microservices and rely upon instrumenting the code. This makes adoption of such tools into existing distributed systems complex. Given the polyglot nature of huge production systems, doing a white-box instrumentation of code can be very challenging as it is dependent on language-specific libraries or technologies.

In this project, we have investigated a hybrid method for distributed tracing of microservices. Our approach will help keep the tracing application-transparent and would require minimal changes in the source code. We have implemented a hybrid instrumentation of microservices via kubernetes i.e. by adding agents to the container running the microservice. We have developed a UI for graphical navigation of trace data by viewing interactively generated UML sequence diagrams to represent end-to-end distributed traces. Using this trace data will enable developers to analyse flow of API calls to identify errors or changes in the overall behavior of the distributed system.

## System Architecture
![alt text](https://github.com/nguyensjsu/cmpe295-tracer/blob/master/images/ArchitectureDiagram%20for%20295A.png)
