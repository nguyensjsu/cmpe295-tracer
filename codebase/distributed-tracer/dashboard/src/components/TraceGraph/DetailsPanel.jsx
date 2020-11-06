import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import ReactJson from "react-json-view";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "white",
        width: 600,
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

    useEffect(_ => {
        setFilterLogs(logs.filter(l => l.appName === selectedNode.name))
    }, [selectedNode])

    return (
        <div className={classes.root}>
            <div className={classes.logsData}>
                <h2>{selectedNode.name}</h2>
                <Typography className={classes.pos} color="textSecondary">
                    {selectedNode.ip}
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