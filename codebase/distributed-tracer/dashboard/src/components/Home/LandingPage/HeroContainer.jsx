import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

    paper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#323480',
        backgroundImage: 'linear-gradient(to top right, #323480, #3F52B5,#8FCAF9)',
        color: '#fff',
        minHeight: '600px',
    },
    whiteColor: {
        color: '#fff',
        borderColor: "white",
        marginRight: '5px',
        "&:hover": {
            color: '#dedede',
            borderColor: "#dedede",
        }
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
                <Button variant="outlined" size={"large"} className={classes.whiteColor}
                        onClick={_ => window.scrollTo(0, 601)}>
                    Get Started
                </Button>
                <Button variant="outlined" size={"large"} className={classes.whiteColor} href={"/#/trace-list"}>
                    Dashboard
                </Button>
            </div>
        </div>
    )
}