import React, {useState, useEffect} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Graph from "./Graph";
import {DetailsPanel} from "./DetailsPanel";
import {updateData} from '../../Library'
import SearchAppBar from "../../AppBar";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "white",
        display: 'flex',
        width: "100%",
        height: "calc(100vh - 64px)",
    },
}));

export default function (props) {
    const classes = useStyles();
    const [logs, setLogs] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const {uuid} = props.match.params;

    useEffect(() => {
        updateData(uuid).then(({nodes, links, logs}) => {
            setNodes(nodes);
            setLinks(links);
            setLogs(logs);
        })

    }, [uuid]);

    const [startNode, setStartNode] = useState("n0");
    const [endNode, setEndNode] = useState("n2");
    const [paths, setPaths] = useState([]);
    const [highlightedPath, setHighlightedPath] = useState("");
    const [selectedNode, setSelectedNode] = useState({});
    return (
        <div className={classes.container}>
            <SearchAppBar/>
            <div className={classes.root}>
                <Graph
                    onSelect={setSelectedNode}
                    nodes={nodes} links={links}
                    startNode={startNode} setStartNode={setStartNode}
                    endNode={endNode} setEndNode={setEndNode}
                    paths={paths} setPaths={setPaths}
                    highlightedPath={highlightedPath}
                />
                <DetailsPanel
                    logs={logs}
                    selectedNode={selectedNode}
                    setSelectedNode={setSelectedNode}
                />
            </div>
        </div>
    );
}