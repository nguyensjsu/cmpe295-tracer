import {fetchLogs} from "../../API";

export async function updateData(uuid) {
    let nodes = []
    let logs = []
    await fetchLogs(uuid)
        .then(data => logs = data)
    nodes = getNodes(logs)
    let emptyIndex = logs.findIndex(l => l.parentSpanId === "EMPTY" && l.spanId.split("|")[0] === "EMPTY")
    if (emptyIndex > 0) {
        let spanId = logs[emptyIndex].spanId.split("|")
        spanId[2] = 0
        logs[emptyIndex].spanId = spanId.join("|")
    }
    return {
        nodes: nodes.map(n => ({name: n, label: n, ip: ""})),
        links: getLinks(logs, nodes),
        logs: newLogs(logs, nodes)
    }
}

const getNodes = (logs) => {
    let sortedLogs = logs.filter(log => log.log_source === "envoy" && log.log_type === "REQUEST").sort((a, b) => a.spanId.split('|')[2] - b.spanId.split('|')[2])
    return [...new Set(sortedLogs.map(l => l.appName))]
}

const getLinks = (logs, nodes) => {
    const getNodeNumber = (node) => nodes.findIndex(n => node === n)

    let links = []
    logs.forEach((log) => {
        if (log.log_type === "REQUEST") {

            let spanId = log.spanId.split('|')[0];
            let targetNodes = logs.filter(l => spanId === l.parentSpanId && l.log_type === "REQUEST" && spanId !== "EMPTY" && log.appName !== l.appName)


            for (let targetNode of targetNodes) {
                if (targetNode) {
                    // console.log(log.appName, log.spanId, targetNode.appName)
                    links.push({
                        source: getNodeNumber(log.appName),
                        target: getNodeNumber(targetNode.appName)
                    })
                }
            }
        }
    })
    return links
}

const newLogs = (logs, nodes) => {
    let updatedLogs = []
    nodes.forEach(node => {
        const microserviceLog = logs.filter(log => log.appName === node);
        let envoyLogs = microserviceLog.filter(log => log.log_source === "envoy" && log.log_type === "REQUEST").sort((a, b) => a.spanId.split('|')[2] - b.spanId.split('|')[2]);
        const istioLogs = microserviceLog.filter(log => log.log_source === "istio").sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
        envoyLogs = envoyLogs.map(log => ({
            spanId: log.spanId,
            parentSpanId: log.parentSpanId,
            body: log.body,
            log_type: log.log_type
        }));
        updatedLogs.push(...envoyLogs.map((l, i) => ({...istioLogs[i], ...l})));
        const envoyResponseLogs = microserviceLog.filter(log => log.log_source === "envoy" && log.log_type === "RESPONSE");
        updatedLogs.push(...envoyResponseLogs);
    });
    updatedLogs.sort((a, b) => a.spanId.split("|")[2] - b.spanId.split("|")[2])
    return updatedLogs
};