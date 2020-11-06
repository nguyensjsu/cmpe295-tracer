import React from 'react'

import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import BuildIcon from '@material-ui/icons/Build';
import Typography from "@material-ui/core/Typography";

import HeroContainer from "./HeroContainer";
import GuideCard from "./GuideCard";
import Contributors from "./Contributors";
import Link from "@material-ui/core/Link";

function Copyright() {
    return (
        <Typography variant="body2" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0px',
        margin: '0px',
        maxWidth: '100%'

    },
    guideCardsContainer: {
        margin: '70px 50px'
    },
    iconColor:{
        color: '#8FCAF9'
    },
    footer: {
        padding:theme.spacing(6, 0),
        backgroundColor: '#BDBDBD',
        color: '#000'
    }
}));

const heroContainer = {
    title: "Distributed Tracing of Microservices"
}

export default function (props) {
    const classes = useStyles();
    const installation = {
        avatar: <ArrowDownwardIcon className={classes.iconColor} fontSize={"large"}/>,
        title: "Installation",
        linkData: 'READ INSTALLATION DOCS',
        link: "#"
    }
    const usage = {
        avatar: <BuildIcon className={classes.iconColor} fontSize={"large"}/>,
        title: "Usage",
        linkData: 'READ USAGE DOCS',
        link: "#"
    }
    return (
        <>
            <CssBaseline/>
            <Container maxWidth="lg" className={classes.container}>

                <HeroContainer title={heroContainer.title}/>

                <div className={classes.guideCardsContainer}>
                    <Grid container spacing={3}>
                        <GuideCard avatar={installation.avatar} title={installation.title} linkData = {installation.linkData} link = {installation.link} >
                            <Typography variant="body1" gutterBottom>
                                This is the installation guide<br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </Typography>
                        </GuideCard>

                        <GuideCard avatar={usage.avatar} title={usage.title} linkData = {usage.linkData} link = {usage.link}>
                            <Typography variant="body1" gutterBottom>
                                This is the usage guide<br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </Typography>
                        </GuideCard>

                    </Grid>
                </div>

                <Contributors/>
                <footer className={classes.footer}>
                        <Typography variant="h6" align="center" gutterBottom>
                            title
                        </Typography>
                        <Typography variant="subtitle1" align="center" component="p">
                            description
                        </Typography>
                        <Copyright />
                </footer>
            </Container>


        </>
    )
}