import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    card: {
        padding: '20px',
    },
    cardHeader: {
        borderBottom: '1px solid lightgrey',
        padding: '0px 16px'
    },
    cardContent: {
        height: '400px',
        fontSize: '1.2rem'
    },
    cardFooter:{
        borderTop: '1px solid lightgrey',
        paddingTop: '16px'
    }
}))

export const GuideCard = (props) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={6}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={props.avatar}
                    title={<h2>{props.title}</h2>}
                    className={classes.cardHeader}
                />
                <CardContent className={classes.cardContent}>
                    {props.children}
                </CardContent>
                <div className={classes.cardFooter}>
                    <Button href={props.link} color="primary">
                        {props.linkData}
                    </Button>
                </div>
            </Card>
        </Grid>
    )
}