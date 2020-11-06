import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

    paper: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#5b23c2',
        color: '#fff',
        minHeight: '80%',
    },
    grid:{
        margin: '0px'
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    image: {
        width: 200,
        height: 200,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    whiteColor: {
        color: '#000',
        backgroundColor: "#E4F5F5"
    }

}));

export default function (props) {
    const classes = useStyles();
    return (
        <div className={classes.paper}>
            <Grid container spacing={5} className={classes.grid}>
                <Grid item xs = {3} md={5} className={classes.imageContainer}>
                    <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="Logo"
                             src={require("../../../static/images/logo.png")}/>
                    </ButtonBase>
                </Grid>
                <Grid item xs={9} md={7}>
                    <Typography component="h1" variant="h2" color="inherit" gutterBottom>
                        {props.title}
                    </Typography>
                    <Button variant="contained" className={classes.whiteColor} href={"/tracelist"}>
                        Get Started
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}