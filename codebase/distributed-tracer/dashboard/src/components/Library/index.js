import axios from "axios";
import {fetchLogs} from "../../API";

export async function updateData(uuid) {
    let nodes = []
    let logs = []
    await fetchLogs(uuid)
        .then(data => logs = data)
    nodes = getNodes(logs)
    return {
        nodes: nodes.map(n => ({name: n, label: n, ip: "0.0.0.0"})),
        links: getLinks(logs, nodes),
        logs: logs.filter(l => l.log_source !== "istio")
    }
}

const getNodes = (logs) => {
    return [...new Set(logs.map(l => l.appName))]
}

const getLinks = (logs, nodes) => {
    const getNodeNumber = (node) => nodes.findIndex(n => node === n)

    let links = []
    logs.forEach((log) => {
        if (log.log_type === "REQUEST") {

            let targetNodes = logs.filter(l => log.spanId === l.parentSpanId && l.log_type === "REQUEST" && log.spanId !== "EMPTY" && log.appName !== l.appName)

            let inboundLogs = logs.filter(l => {
                return l.log_source === "istio" && log.appName === l.appName && l.upstream_cluster.split("|")[0] === "inbound"
            })

            let outboundLogs = logs.filter(l => {
                return l.log_source === "istio" && log.appName === l.appName && l.upstream_cluster.split("|")[0] === "outbound"
            })

            // console.log(inboundLogs)
            if (targetNodes.length > 0) {
                log.istioLog = outboundLogs[0]
            } else
                log.istioLog = inboundLogs[0]

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