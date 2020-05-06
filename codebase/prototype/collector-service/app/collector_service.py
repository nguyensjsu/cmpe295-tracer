import os
import json
import time
import threading
from kafka import KafkaProducer


def read_envoy_access_logs(app_no):
    #work on more efficient reading of streaming logs
    read_till_now = set()
    while True:
        stream = os.popen('kubectl logs -l app=cmpe-295-app-{} -c istio-proxy'.format(app_no))
        f = stream.read().split()
        print("THREAD FOR APP", app_no)
        # f = open("logs{}.txt".format(app_no), "r")
        for line in f:
            if "bytes_sent" in line and line not in read_till_now:
                #send to Kafka
                # producer = KafkaProducer(bootstrap_servers='kafka:32768')
                # producer.send('test-topic', value=num_bytes, key=num_bytes)
                read_till_now.add(line)
                print("Reading Now")
                print("Line is ", json.loads(line))
            else:
                print("Line skipped")
        # f.close()
        time.sleep(10)


if __name__ == "__main__":
    # work on discovering services and starting them
    app_1_process = threading.Thread(target=read_envoy_access_logs, args=(1,))
    app_2_process = threading.Thread(target=read_envoy_access_logs, args=(2,))
    app_1_process.start()
    app_2_process.start()