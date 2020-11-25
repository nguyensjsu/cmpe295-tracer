import React from "react";

import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    main: {
        padding: theme.spacing(7, 7),
    },
    cardsRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: '25px'
    },
    card: {
        width: '270px',
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
        justifyContent: 'center',
        marginBottom: theme.spacing(5)
    },
    cardHeader: {
        padding: '30px'
    },
    avatar: {
        width:'35px',
        height:'35px',
        backgroundColor: '#323480'
    }

}));

export const Contributors = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <Typography align={"center"} component="h1" variant="h3" gutterBottom>
                Contributors
            </Typography>
            <div className={classes.cardsRoot}>
                <Card className={classes.card}>
                    <CardHeader
                        style={{padding: '5px'}}
                        avatar={
                            <Avatar aria-label="pallavi" className={classes.avatar}>
                                B
                            </Avatar>
                        }
                        title="Busi Pallavi Reddy"
                    />
                </Card>
                <Card className={classes.card}>
                    <CardHeader
                        style={{padding: '5px'}}
                        avatar={
                            <Avatar aria-label="prachi" className={classes.avatar}>
                                P
                            </Avatar>
                        }
                        title="Prachi Chouksey"
                    />
                </Card>
                <Card className={classes.card}>
                    <CardHeader
                        style={{padding: '5px'}}
                        avatar={
                            <Avatar aria-label="maunil" className={classes.avatar}>
                                M
                            </Avatar>
                        }
                        title="Maunil Swadas"
                    />
                </Card>

                <Card className={classes.card}>
                    <CardHeader
                        style={{padding: '5px'}}
                        avatar={
                            <Avatar aria-label="devanshi" className={classes.avatar}>
                                D
                            </Avatar>
                        }
                        title="Devanshi Trivedi"
                    />
                </Card>
            </div>

            <Typography className={classes.guide} component="h1" variant="h3" gutterBottom align={"center"}>
                Guide
            </Typography>
            <div className={classes.guideMain}>
                <Card className={classes.card}>
                    <CardHeader
                        style={{padding: '5px'}}
                        avatar={
                            <Avatar aria-label="paul" className={classes.avatar}>
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