import os
import json
import time
import threading
import requests
# from kafka import KafkaProducer


def read_envoy_access_logs(app):
    read_till_now = set()
    while True:
        line1 = None
        try:
            stream = os.popen('kubectl logs -l app={} -c istio-proxy'.format(app))
            f = stream.read().split("\n")
            #print("THREAD FOR APP", app)
            for line in f:
                payload = {}
                if ("cmpe295-generator-service" in line) and line not in read_till_now:
                    read_till_now.add(line)
                    fields = line.split("|")
                    line1 = line
                    if fields[1] == "REQUEST":
                        payload["request_id"] = fields[2]
                        payload["spanId"] = fields[3] + "|" + fields[6] + "|" + fields[7]
                        payload["parentSpanId"] = fields[4]
                        payload["body"] = fields[5]
                        payload["log_type"] = "REQUEST"
                    else:
                        response_headers = json.loads(fields[3])
                        payload["spanId"] = response_headers["x-b3-spanid"] + "|" + response_headers['x-unique-spanid'] + "|" + fields[5]
                        payload["parentSpanId"] = response_headers["x-b3-parentspanid"] if "x-b3-parentspanid" in response_headers else "EMPTY"
                        payload["request_id"] = response_headers["x-request-id"]
                        payload["body"] = fields[4]
                        payload["log_type"] = "RESPONSE"
                    payload["log_source"] = "envoy"
                    payload["appName"] = app
    
                elif ("authority" in line) and line not in read_till_now:
                    read_till_now.add(line)
                    payload = json.loads(line)
                    payload["appName"] = app
                    payload["log_source"] = "istio"
                if payload != {}: 
                    print(payload)
                    r = requests.post('http://<kafka>/publish', json=payload)

            #time.sleep(1)
        except:
            print("error in ", app, line1)

if __name__ == "__main__":
    app_1_process = threading.Thread(target=read_envoy_access_logs, args=("cmpe295-movies-service",))
    app_2_process = threading.Thread(target=read_envoy_access_logs, args=("cmpe295-cinema-service",))
    app_3_process = threading.Thread(target=read_envoy_access_logs, args=("cmpe295-booking-service",))
    app_4_process = threading.Thread(target=read_envoy_access_logs, args=("cmpe295-payment-service",))
    app_5_process = threading.Thread(target=read_envoy_access_logs, args=("cmpe295-notification-service",))
    app_6_process = threading.Thread(target=read_envoy_access_logs, args=("cmpe295-receipt-service",))
    
    app_1_process.start()
    app_2_process.start()
    app_3_process.start()
    app_4_process.start()
    app_5_process.start()
    app_6_process.start()
