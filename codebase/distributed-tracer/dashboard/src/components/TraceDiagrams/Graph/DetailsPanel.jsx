import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {LogsViewer} from "./LogsViewer";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "white",
        borderLeft: "1px solid #ddd",
        padding: 20,
    },
    iconContainer: {},
    logsData: {
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },
    logContainer: {
        overflowY: "auto",
        alignSelf: "stretch",
        width: "50vw",
        maxWidth: "50vw",
    },
    pos: {
        marginBottom: 12,
    },
}));

export const DetailsPanel = ({selectedNode, logs, setSelectedNode}) => {
    const classes = useStyles();
    const [filterLogs, setFilterLogs] = useState([])

    useEffect(_ => {
        let appLogs = logs.filter(l => l.appName === selectedNode.name)
        setFilterLogs(appLogs)
        let info = appLogs.find(l => {
            let istioLog = l.istioLog
            return !!(istioLog && istioLog.upstream_cluster && istioLog.upstream_cluster.split("|")[0] === "inbound");
        })

    }, [selectedNode])

    useEffect(_ => {
        if (logs.length !== 0) {
            let selectedLog = logs.find(l => l.parentSpanId === "EMPTY" && l.spanId.split("|")[0] === "EMPTY")
            if (selectedLog)
                setSelectedNode({name: selectedLog.appName})
        }
    }, [logs])

    return (
        <div className={classes.root}>
            <div className={classes.logsData}>
                <h2>{selectedNode.name}</h2>
                <div className={classes.logContainer}>
                    {selectedNode.name && <LogsViewer allLogs={logs} logs={filterLogs}/>}
                </div>
            </div>
            <div className={classes.iconContainer}>
                {/*<Tooltip title="Show Sequence Diagram">*/}
                {/*    <IconButton onClick={() => {*/}
                {/*        window.location = '/sequence-diagram'*/}
                {/*    }}>*/}
                {/*        <ArrowForwardIosIcon/>*/}
                {/*    </IconButton>*/}
                {/*</Tooltip>*/}
            </div>
        </div>
    );
}

