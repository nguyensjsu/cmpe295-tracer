import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import LandingPage from "./LandingPage/index";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: "100%",
        height: "100vh",
        justifyContent: "space-evenly",
    },
}));

export default function (props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <LandingPage/>
        </div>
    );
}