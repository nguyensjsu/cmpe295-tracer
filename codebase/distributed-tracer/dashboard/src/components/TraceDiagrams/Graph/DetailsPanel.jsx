import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import ReactJson from "react-json-view";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "white",
        width: 1000,
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
        alignSelf: "stretch"
    },
    pos: {
        marginBottom: 12,
    },
}));

export default function ({selectedNode, logs}) {
    const classes = useStyles();
    const [filterLogs, setFilterLogs] = useState([])
    const [microserviceInfo, setMicroserviceInfo] = useState({})

    useEffect(_ => {
        let appLogs = logs.filter(l => l.appName === selectedNode.name)
        setFilterLogs(appLogs)
        let info = appLogs.find(l => {
            let istioLog = l.istioLog
            return !!(istioLog && istioLog.upstream_cluster && istioLog.upstream_cluster.split("|")[0] === "inbound");
        })
        setMicroserviceInfo(info)
        // if (info) {
        //     setMicroserviceInfo({
        //         method: info.method,
        //         start_time: info.start_time,
        //         path: info.path,
        //         protocol: info.protocol
        //     })
        // }
    }, [selectedNode])

    return (
        <div className={classes.root}>
            <div className={classes.logsData}>
                <h2>{selectedNode.name}</h2>
                <Typography className={classes.pos} color="textSecondary">
                    {/*{JSON.stringify(microserviceInfo)}*/}
                    Method: {microserviceInfo && microserviceInfo.istioLog && microserviceInfo.istioLog.method}<br/>
                    Start Time: {microserviceInfo && microserviceInfo.istioLog && microserviceInfo.istioLog.start_time}<br/>
                    Path: {microserviceInfo && microserviceInfo.istioLog && microserviceInfo.istioLog.path}<br/>
                    Protocol: {microserviceInfo && microserviceInfo.istioLog && microserviceInfo.istioLog.protocol}<br/>
                </Typography>
                <div className={classes.logContainer}>
                    {selectedNode.name && <ReactJson enableClipboard={false} src={filterLogs}/>}
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

