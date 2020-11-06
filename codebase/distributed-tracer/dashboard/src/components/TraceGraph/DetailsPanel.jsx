import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import findPath from "../../utils/findPath";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Divider from "@material-ui/core/Divider";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {IconButton} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "white",
        width: 200,
        display: "flex",
        alignItems: "center",
        padding: 20,
        justifyContent: "center",
        flexDirection: "column"
    },
    formControl: {
        width: "calc(33% - 10px)",
        margin: 5
    },
    button: {
        width: "33%",
        position: "relative",
        top: 6,
        padding: 16
    },
    list: {
        width: "100%",
    },
    listItem: {
        padding: 20
    },

    iconContainer: {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        bottom: 0,
        backgroundColor: 'lightgrey',
        width:200,
    },
    logsData:{
        padding:20,
        position:'absolute',
        top:0,
        wordBreak: 'wrap'

    }
}));

export default function ({
                             nodes, links,
                             startNode, setStartNode,
                             endNode, setEndNode,
                             paths, setPaths,
                             highlightedPath, setHighlightedPath,
                             selectedNode
                         }) {
    const classes = useStyles();

    const findAllPaths = _ => {
        if (startNode !== "none" && endNode !== "none")
            setPaths(findPath(nodes, links, startNode, endNode))
        else
            setPaths([])
    }

    return (
        <div className={classes.root}>
            <div className={classes.logsData}>{selectedNode.name} {selectedNode.ip}</div>
            <div className={classes.iconContainer}>
                <Tooltip title="Show Sequence Diagram">
                    <IconButton onClick={() => {
                        window.location = '/sequence-diagram'
                    }}>
                        <ArrowForwardIosIcon/>
                    </IconButton>
                </Tooltip>
            </div>
            {/*<div>*/}
            {/*    <FormControl variant="outlined" className={classes.formControl}>*/}
            {/*        <InputLabel>Start Node</InputLabel>*/}
            {/*        <Select*/}
            {/*            value={startNode}*/}
            {/*            onChange={e => setStartNode(e.target.value)}*/}
            {/*            label="Start Node"*/}
            {/*        >*/}
            {/*            <MenuItem value="none">*/}
            {/*                <em>None</em>*/}
            {/*            </MenuItem>*/}
            {/*            {nodes.map(n => <MenuItem key={n.name} value={n.name}>{n.name}</MenuItem>)}*/}
            {/*        </Select>*/}
            {/*    </FormControl>*/}
            {/*    <FormControl variant="outlined" className={classes.formControl}>*/}
            {/*        <InputLabel>End Node</InputLabel>*/}
            {/*        <Select*/}
            {/*            value={endNode}*/}
            {/*            onChange={e => setEndNode(e.target.value)}*/}
            {/*            label="End Node"*/}
            {/*        >*/}
            {/*            <MenuItem value="none">*/}
            {/*                <em>None</em>*/}
            {/*            </MenuItem>*/}
            {/*            {nodes.map(n => <MenuItem key={n.name} value={n.name}>{n.name}</MenuItem>)}*/}
            {/*        </Select>*/}
            {/*    </FormControl>*/}
            {/*    <Button className={`${classes.button}`} onClick={findAllPaths}>List all paths</Button>*/}
            {/*</div>*/}

            {/*<List component="nav" className={classes.list} aria-label="contacts">*/}
            {/*    <Divider component="li"/>*/}
            {/*    {paths.map(path => <React.Fragment>*/}
            {/*            <ListItem className={classes.listItem}>*/}
            {/*                <ListItemText primary={path.join(" > ")}/>*/}
            {/*                <ListItemSecondaryAction>*/}
            {/*                    <ButtonGroup color="primary">*/}
            {/*                        <Button onClick={setHighlightedPath.bind(this, path)}>Highlight</Button>*/}
            {/*                        <Button onClick={()=>{ window.location = '/seqdia'}}>Detailed View</Button>*/}
            {/*                    </ButtonGroup>*/}
            {/*                </ListItemSecondaryAction>*/}
            {/*            </ListItem>*/}
            {/*            <Divider component="li"/>*/}
            {/*        </React.Fragment>*/}
            {/*    )}*/}
            {/*</List>*/}
        </div>
    );
}