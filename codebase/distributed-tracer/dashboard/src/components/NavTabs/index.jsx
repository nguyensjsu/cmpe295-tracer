import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function NavTabs({requestId}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button onClick={_ => window.location = "/#/trace-graph/" + requestId}>Component Diagram</Button>
                <Button onClick={_ => window.location = "/#/sequence-diagram/" + requestId}>Sequence Diagram</Button>
                <Button onClick={_ => window.location = "/#/trace-logs/" + requestId}>Logs</Button>
            </ButtonGroup>
        </div>
    );
}
