const data = {
    "traceInfo":{
    "cluster": {
        "reporter": "destination",
            "requestId": "e3f7cffb-5642-434d-ae75-233a05b06158",
            "requestedServerName": "outbound_.9080_._.node1.default.svc.cluster.local",
            "source": {
            "sourceApp": "node1",
                "sourceIp": "10.44.0.8",
                "sourceName": "node1v1-6db7564db8-pvsnd",
                "sourceNamespace": "default",
                "sourceOwner": "kubernetes://apis/apps/v1/namespaces/istio-control/deployments/node1-v1",
                "sourcePrincipal": "cluster.local/ns/default/sa/default",
                "sourceWorkload": "node1-v1"
        },
        "destination": {
            "destinationApp": "node2",
                "destinationIp": "10.44.2.15",
                "destinationName": "node2-v1-6db7564db8-pvsnd",
                "destinationNamespace": "default",
                "destinationOwner": "kubernetes://apis/apps/v1/namespaces/default/deployments/node2-v1",
                "destinationPrincipal": "cluster.local/ns/default/sa/default",
                "destinationServiceHost": "node2.default.svc.cluster.local",
                "destinationWorkload": "node2-v1"
        }
    },

    "metadata": {
        "protocol": {
            "type": "http",
                "latency": "35.076236ms",
                "method": "POST",
                "referer": "referer",
                "userAgent": "curl/7.54.0",
                "xForwardedFor": "10.128.0.35"
        },
        "request": {
            "url": "/sync",
                "requestSize": 0,
                "params": {
                "traceid":"123"
            },
            "body": {
                "key": "129871497",

                    "json": "glossary",

                    "Abbrev":"ISO 8879:1986",

                    "vclock": [

                    "M288421QVHV2L:1", null, null, null, null, null
                ],
                    "command": "create"
            }
        },
        "response": {
            "responseCode": 200,
                "responseFlags": "-",
                "responseSize": 4183,
                "responseTimestamp": "2019-06-11T20:57:35.459150Z",
                "sentBytes": 4328,
                "body": {
                "key": "129871497",

                    "json": "glossary",

                    "Abbrev":"ISO 8879:1986",

                    "vclock": [

                    "M288421QVHV2L:1", null, null, null, null, null
                ],
                    "command": "create",
                    "message":"Document Created Successfully"
            }
        },
        "receivedBytes": 917
    }
}
}