import axios from "axios";

export async function updateData() {
    let nodes = []
    let logs = []
    await axios.get('http://localhost:8081/logs').then(res => res.data)
        .then(data => logs = data)
    nodes = getNodes(logs)
    return {
        nodes: nodes.map(n => ({name: n, label: n, ip: "0.0.0.0"})),
        links: getLinks(logs, nodes),
        logs: logs
    }
}

const getNodes = (logs) => {
    return [...new Set(logs.map(l => l.appName))]
}

const getLinks = (logs, nodes) => {
    const getNodeNumber = (node) => nodes.findIndex(n => node === n)

    let links = []
    for (let log of logs) {
        if (log.log_type === "REQUEST") {
            let targetNode = logs.find(l => log.spanId === l.parentSpanId && l.log_type === "REQUEST" && log.spanId !== "EMPTY" && log.appName !== l.appName)
            if (targetNode) {
                console.log(log.appName, log.spanId, targetNode.appName)
                links.push({
                    source: getNodeNumber(log.appName),
                    target: getNodeNumber(targetNode.appName)
                })
            }
        }
    }
    return links
}