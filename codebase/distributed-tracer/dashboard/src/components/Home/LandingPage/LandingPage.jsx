import React from 'react'

import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import BuildIcon from '@material-ui/icons/Build';
import Typography from "@material-ui/core/Typography";

import {HeroContainer} from "./HeroContainer";
import {GuideCard} from "./GuideCard";


const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0px',
        margin: '0px',
        maxWidth: '100%'

    },
    guideCardsContainer: {
        margin: '70px 50px'
    },
    iconColor: {
        color: '#8FCAF9'
    },
    footer: {
        flexGrow: 1,
        padding: theme.spacing(5, 5),
        backgroundColor: '#000',
        color: '#bdbdbd'
    },
    paper: {
        marginLeft: '20px',
        padding: theme.spacing(1),
        textAlign: 'center',
        background: 'none',
        color: '#eee'
    },
    footerTitle: {
        marginRight: '20px',
        textAlign: 'center',
        background: 'none',
        color: '#eee',
        fontSize: '20px'
    },
}));

const heroContainer = {
    title: "Distributed Tracing of Microservices"
}

export const LandingPage = (props) => {
    const classes = useStyles();
    const installation = {
        avatar: <ArrowDownwardIcon className={classes.iconColor} fontSize={"large"}/>,
        title: "Installation",
        linkData: 'READ INSTALLATION DOCS',
        link: "#"
    };
    const usage = {
        avatar: <BuildIcon className={classes.iconColor} fontSize={"large"}/>,
        title: "Usage",
        linkData: 'READ USAGE DOCS',
        link: "#"
    };
    return (
        <>
            <CssBaseline/>
            <Container maxWidth="lg" className={classes.container}>

                <HeroContainer title={heroContainer.title}/>

                {/*<div className={classes.guideCardsContainer} id='usage-id'>*/}
                {/*    <Grid container spacing={3}>*/}
                {/*        <GuideCard avatar={installation.avatar} title={installation.title}*/}
                {/*                   linkData={installation.linkData} link={installation.link}>*/}
                {/*            <Typography variant="body1" gutterBottom>*/}
                {/*                This is the installation guide<br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*            </Typography>*/}
                {/*        </GuideCard>*/}

                {/*        <GuideCard avatar={usage.avatar} title={usage.title} linkData={usage.linkData}*/}
                {/*                   link={usage.link}>*/}
                {/*            <Typography variant="body1" gutterBottom>*/}
                {/*                This is the usage guide<br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*            </Typography>*/}
                {/*        </GuideCard>*/}

                {/*    </Grid>*/}
                {/*</div>*/}

                {/*<Contributors/>*/}
                <footer className={classes.footer}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.paper} style={{textAlign: 'right',fontSize:25}}>San Jose State
                                        University</Paper>
                                </Grid>
                                <Grid item xs={3} sm={6}>
                                    <Paper className={classes.paper} style={{textAlign: 'left',paddingTop:15}}>
                                        CMPE 295<br/>
                                        Major Project<br/>
                                        Development
                                    </Paper>
                                </Grid>
                                {/*<Paper className={classes.footerTitle} style={{textAlign: 'right'}}>CMPE 295B</Paper>*/}
                                {/*<Paper className={classes.footerTitle} style={{textAlign: 'right'}}>San Jose State*/}
                                {/*    University</Paper>*/}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.paper} style={{textAlign: 'right'}}>Contributors</Paper>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.paper} style={{textAlign: 'left'}}>
                                        Busi Pallavi Reddy<br/>
                                        Prachi Chowksey<br/>
                                        Maunil Swadas<br/>
                                        Devanshi Trivedi
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.paper} style={{textAlign: 'right'}}>Guide</Paper>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.paper} style={{textAlign: 'left'}}>Paul Nguyen</Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </footer>
            </Container>
        </>
    )
}