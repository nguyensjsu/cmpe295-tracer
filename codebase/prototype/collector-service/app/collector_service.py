import os
import json
import time
import threading
import requests
# from kafka import KafkaProducer


def read_envoy_access_logs(app_no):
    #work on more efficient reading of streaming logs
    read_till_now = set()
    while True:
        stream = os.popen('kubectl logs -l app=cmpe-295-app-{} -c istio-proxy'.format(app_no))
        f = stream.read().split('\n')
        print("THREAD FOR APP", app_no)
        # f = open("logs{}.txt".format(app_no), "r")
        for line in f:
            if "authority" in line and line not in read_till_now:
                read_till_now.add(line)
                print("Reading Now")
                log = json.loads(line)
                print(log)
                r = requests.post('http://localhost:8081/publish', json=log)
                print(r.status_code)

        # f.close()
        time.sleep(10)


if __name__ == "__main__":
    # work on discovering services and starting them
    app_1_process = threading.Thread(target=read_envoy_access_logs, args=(1,))
    app_2_process = threading.Thread(target=read_envoy_access_logs, args=(2,))
    app_3_process = threading.Thread(target=read_envoy_access_logs, args=(3,))
    app_4_process = threading.Thread(target=read_envoy_access_logs, args=(4,))
    app_1_process.start()
    app_2_process.start()
    app_3_process.start()
    app_4_process.start()
