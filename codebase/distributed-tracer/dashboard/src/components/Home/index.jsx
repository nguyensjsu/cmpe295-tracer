import React from 'react'
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core/styles";
import GenerateRequest from "./GenerateRequest";
import TraceList from "./TraceList";
import LandingPage from "./LandingPage/index";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: "100%",
        height: "100vh",
        justifyContent: "space-evenly",
        // alignItems: "center"
    },
}));

export default function (props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/*<GenerateRequest/>*/}
            {/*<TraceList/>*/}
            <LandingPage/>
        </div>
    );
}