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
        logs: newLogs(logs,nodes)
        // logs: logs

        // logs: logs.filter(l => l.log_source !== "istio")
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

            let spanId = log.spanId.split('|')[0];
            let targetNodes = logs.filter(l => spanId === l.parentSpanId && l.log_type === "REQUEST" && spanId !== "EMPTY" && log.appName !== l.appName)

            // let inboundLogs = logs.filter(l => {
            //     return l.log_source === "istio" && log.appName === l.appName && l.upstream_cluster.split("|")[0] === "inbound"
            // })
            //
            // let outboundLogs = logs.filter(l => {
            //     return l.log_source === "istio" && log.appName === l.appName && l.upstream_cluster.split("|")[0] === "outbound"
            // })
            //
            // // console.log(inboundLogs)
            // if (targetNodes.length > 0) {
            //     log.istioLog = outboundLogs[0]
            // } else
            //     log.istioLog = inboundLogs[0]

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

//--------------------------------------------------
// {body: {page: 1}, start: 0, end: 1, spanid: "0", type: "request", message: "GET:/browse", parentSpanId: null},

const newLogs = (logs, nodes) => {
    let updatedLogs = [];
    nodes.forEach(node => {
        const microserviceLog = logs.filter(log => log.appName === node);
        let envoyLogs = microserviceLog.filter(log => log.log_source === "envoy" && log.log_type === "REQUEST").sort((a, b) => a.spanId.split('|')[2] > b.spanId.split('|')[2]);
        const istioLogs = microserviceLog.filter(log => log.log_source === "istio").sort((a, b) => new Date(a.start_time) > new Date(b.start_time));
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
    return updatedLogs;
};

// export async function getSeqDetails(uuid) {
//     console.log("nextLogs");
//     let logs = [];
//     await fetchLogs(uuid)
//         .then(data => logs = data);
//     let nodes = getNodes(logs);
//
//     let messages = logs.filter(log => log.parentSpanId === "EMPTY" && log.spanId.split('|')[0] === "EMPTY");
//
//     let updatedLogs = newLogs(logs, nodes);
//     nodes.unshift("User");
//
//     return ({
//         nodes: nodes.map(n => ({name: n, label: n, ip: "0.0.0.0"})),
//         _messages: updatedLogs.map(m => {
//             return ({
//                 start: "User",
//                 end: m.appName,
//                 type: m.log_type,
//                 spanid: m.spanId,
//                 parentSpanId: m.parentSpanId,
//                 body: {page: 1},
//                 message: "GET:/browse"
//             })
//         })
//     });
// }


//
// export async function nextLogs(uuid,message) {
//     console.log("nextLogs");
//     let nodes = [];
//     let logs = [];
//     let updatedLogs = [];
//     await fetchLogs(uuid)
//         .then(data => logs = data);
//     nodes = getNodes(logs)
//
//     // return {
//     //     nodes: nodes.map(n => ({name: n, label: n, ip: "0.0.0.0"})),
//     //     links: getLinks(logs, nodes),
//     //     logs: logs
//     //     // logs: logs.filter(l => l.log_source !== "istio")
//     // }
// }