module.exports = [{
    "appName": "cmpe295-app-4",
    "timestamp": "2020-11-06T00:30:05.328758Z",
    "log_type": "REQUEST",
    "requestId": "1f4b7e5d-ce09-44e1-a805-cc42d96b632b",
    "spanId": "ebf83b2baf6478d0",
    "parentSpanId": "abbf8e31dfac4e54"
}, {
    "appName": "cmpe295-app-5",
    "timestamp": "2020-11-06T00:30:05.320173Z",
    "log_type": "REQUEST",
    "requestId": "1f4b7e5d-ce09-44e1-a805-cc42d96b632b",
    "spanId": "bda476a0190989da",
    "parentSpanId": "0b84c12874799abc"
}, {
    "appName": "cmpe295-app-5",
    "timestamp": "2020-11-06T00:30:05.324613Z",
    "log_type": "REQUEST",
    "requestId": "1f4b7e5d-ce09-44e1-a805-cc42d96b632b",
    "spanId": "abbf8e31dfac4e54",
    "parentSpanId": "bda476a0190989da"
}, {
    "appName": "cmpe295-app-6",
    "timestamp": "2020-11-06T00:30:05.314920Z",
    "log_type": "REQUEST",
    "requestId": "1f4b7e5d-ce09-44e1-a805-cc42d96b632b",
    "spanId": "EMPTY",
    "parentSpanId": "EMPTY"
}, {
    "appName": "cmpe295-app-6",
    "timestamp": "2020-11-06T00:30:05.320635Z",
    "log_type": "REQUEST",
    "requestId": "1f4b7e5d-ce09-44e1-a805-cc42d96b632b",
    "spanId": "0b84c12874799abc",
    "parentSpanId": "EMPTY"
}, {
    "appName": "cmpe295-app-6",
    "timestamp": "2020-11-06T00:30:05.315286Z",
    "log_type": "REQUEST",
    "requestId": "1f4b7e5d-ce09-44e1-a805-cc42d96b632b",
    "spanId": "EMPTY",
    "parentSpanId": "EMPTY",
    "body": {"foo12": "bar12"}
}, {
    "appName": "cmpe295-app-4",
    "timestamp": "2020-11-06T00:30:06.331414Z",
    "log_type": "RESPONSE",
    "requestId": "1f4b7e5d-ce09-44e1-a805-cc42d96b632b",
    "spanId": "e5710eaf43178e2d",
    "parentSpanId": "ebf83b2baf6478d0",
    "body": {
        "SERVICE_NAME": "service4",
        "requestReceivedAt": "2020-11-06T00:30:05.330Z",
        "responseSentAt": "2020-11-06T00:30:06.330Z"
    }
}, {
    "appName": "cmpe295-app-5",
    "timestamp": "2020-11-06T00:30:06.329469Z",
    "log_type": "RESPONSE",
    "requestId": "1f4b7e5d-ce09-44e1-a805-cc42d96b632b",
    "spanId": "e5710eaf43178e2d",
    "parentSpanId": "ebf83b2baf6478d0",
    "body": {
        "SERVICE_NAME": "service4",
        "requestReceivedAt": "2020-11-06T00:30:05.330Z",
        "responseSentAt": "2020-11-06T00:30:06.330Z"
    }
}, {
    "appName": "cmpe295-app-5",
    "timestamp": "2020-11-06T00:30:07.332388Z",
    "log_type": "RESPONSE",
    "requestId": "1f4b7e5d-ce09-44e1-a805-cc42d96b632b",
    "spanId": "abbf8e31dfac4e54",
    "parentSpanId": "bda476a0190989da",
    "body": {
        "SERVICE_NAME": "service5",
        "requestReceivedAt": "2020-11-06T00:30:05.322Z",
        "responseSentAt": "2020-11-06T00:30:07.331Z",
        "children": [{
            "SERVICE_NAME": "service4",
            "requestReceivedAt": "2020-11-06T00:30:05.330Z",
            "responseSentAt": "2020-11-06T00:30:06.330Z"
        }]
    }
}, {
    "appName": "cmpe295-app-6",
    "timestamp": "2020-11-06T00:30:07.344618Z",
    "log_type": "RESPONSE",
    "requestId": "1f4b7e5d-ce09-44e1-a805-cc42d96b632b",
    "spanId": "abbf8e31dfac4e54",
    "parentSpanId": "bda476a0190989da",
    "body": {
        "SERVICE_NAME": "service5",
        "requestReceivedAt": "2020-11-06T00:30:05.322Z",
        "responseSentAt": "2020-11-06T00:30:07.331Z",
        "children": [{
            "SERVICE_NAME": "service4",
            "requestReceivedAt": "2020-11-06T00:30:05.330Z",
            "responseSentAt": "2020-11-06T00:30:06.330Z"
        }]
    }
}, {
    "appName": "cmpe295-app-6",
    "timestamp": "2020-11-06T00:30:08.354114Z",
    "log_type": "RESPONSE",
    "requestId": "1f4b7e5d-ce09-44e1-a805-cc42d96b632b",
    "spanId": "0b84c12874799abc",
    "parentSpanId": "EMPTY",
    "body": {
        "SERVICE_NAME": "service6",
        "requestReceivedAt": "2020-11-06T00:30:05.318Z",
        "responseSentAt": "2020-11-06T00:30:08.353Z",
        "children": [{
            "SERVICE_NAME": "service5",
            "requestReceivedAt": "2020-11-06T00:30:05.322Z",
            "responseSentAt": "2020-11-06T00:30:07.331Z",
            "children": [{
                "SERVICE_NAME": "service4",
                "requestReceivedAt": "2020-11-06T00:30:05.330Z",
                "responseSentAt": "2020-11-06T00:30:06.330Z"
            }]
        }]
    }
}]
 
