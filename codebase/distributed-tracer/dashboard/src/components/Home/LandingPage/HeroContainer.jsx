import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

    paper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
        backgroundColor: '#323480',
        backgroundImage: 'linear-gradient(to top right, #323480, #8FCAF9)',
        color: '#fff',
        minHeight: '80%',
    },
    whiteColor: {
        color: '#000',
        backgroundColor: "#E4F5F5",
        marginRight: '5px'
    }

}));

export const HeroContainer = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h2" color="inherit" style={{fontWeight: 400}} gutterBottom>
                {props.title}
            </Typography>
            <div>
            <Button variant="contained" className={classes.whiteColor} href="">
                Get Started
            </Button>
            <Button variant="contained" className={classes.whiteColor} href={"/#/trace-list"}>
                Dashboard
            </Button>
            </div>
        </div>
    )
}