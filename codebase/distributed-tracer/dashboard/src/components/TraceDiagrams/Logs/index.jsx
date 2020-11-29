import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {updateData} from '../../Library'
import {useParams} from "react-router-dom";
import ReactJson from "react-json-view";
import SearchAppBar from "../../AppBar";
import NavTabs from "../../NavTabs";

const useStyles = makeStyles((theme) => ({
    root: {},
    jsonContainer: {
        padding: "20px 50px",
        height: "calc(100vh - 156px)",
        overflow: "auto"
    }
}));

export default function Logs(props) {
    const classes = useStyles();
    const [logs, setLogs] = useState([]);
    const [nodes, setNodes] = useState([]);
    const {uuid} = useParams();

    useEffect(() => {
        updateData(uuid).then(({logs}) => {
            setLogs(logs);
        })
    }, [uuid]);

    return (
        <div className={classes.root}>
            <SearchAppBar/>
            <NavTabs requestId={uuid}/>
            <div className={classes.jsonContainer}>
                <ReactJson src={logs}/>
            </div>

        </div>
    );
}