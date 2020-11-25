import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Sequence from "./Sequence";
import {updateData} from '../../Library'
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        width: "100%",
        height: "100vh",
    },
}));

export default function (props) {
    const classes = useStyles();
    const [logs, setLogs] = useState([]);
    const [nodes, setNodes] = useState([]);
    const {uuid} = useParams();

    useEffect(() => {
        updateData(uuid).then(({nodes, logs}) => {
            setNodes([{name:"User",label:"User",ip:"10.0.0.0"},...nodes]);
            setLogs(logs);
        })

    }, [uuid]);

    return (
        <div className={classes.root}>
            <Sequence
                labels={nodes}
                logs={logs}
            />
        </div>
    );
}