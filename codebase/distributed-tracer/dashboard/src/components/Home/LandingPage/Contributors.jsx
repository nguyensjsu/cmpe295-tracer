import React from "react";

import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    main: {
        backgroundColor: '#E4F5F5',
        padding: theme.spacing(10, 5),
    },
    card: {
        width: '300px'
    },
    alignRight: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    guide: {
        padding: theme.spacing(5, 0, 0, 0),
    },
    guideMain: {
        display: 'flex',
        justifyContent: 'center'
    }

}))

export default function (props) {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <Typography align={"center"} component="h1" variant="h3" gutterBottom>
                Contributors
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} className={classes.alignRight}>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="devanshi" className={classes.avatar}>
                                    B
                                </Avatar>
                            }
                            title="Busi Pallavi Reddy"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="devanshi" className={classes.avatar}>
                                    D
                                </Avatar>
                            }
                            title="Devanshi Trivedi"
                        />
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} className={classes.alignRight}>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="devanshi" className={classes.avatar}>
                                    M
                                </Avatar>
                            }
                            title="Maunil Swadas"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="devanshi" className={classes.avatar}>
                                    P
                                </Avatar>
                            }
                            title="Prachi Chouksey"
                        />
                    </Card>

                </Grid>
            </Grid>


            <Typography className={classes.guide} component="h1" variant="h3" gutterBottom align={"center"}>
                Guide
            </Typography>
            <div className={classes.guideMain}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="devanshi" className={classes.avatar}>
                                P
                            </Avatar>
                        }
                        title="Prof. Paul Nguyen"
                    />
                </Card>
            </div>
        </div>

    )
}