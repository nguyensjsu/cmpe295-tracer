import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: '500px',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        top: 0,
        right: 0,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: 'calc(100% - 60px)',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 1),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        // [theme.breakpoints.up('sm')]: {
        //     width: '20ch',
        //     '&:focus': {
        //         width: '20ch',
        //     },
        // },
    },
}));

export default function SearchAppBar() {
    const classes = useStyles();
    const [value, setValue] = useState("")
    const handleSubmit = e => {
        e.preventDefault()
        window.location = '/#/trace-graph/' + value
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Distributed Tracing of Microservices
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.search}>
                            <InputBase
                                placeholder="Enter TraceIDs"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                inputProps={{'aria-label': 'search'}}
                            />
                            <div className={classes.searchIcon}>
                                <ArrowRightAltIcon/>
                            </div>
                        </div>
                    </form>
                </Toolbar>
            </AppBar>
        </div>
    );
}
