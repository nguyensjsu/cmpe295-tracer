import React from "react";
import Typography from '@material-ui/core/Typography';
import {mainStyles} from "../componentStyles/mainStyle";

function HomeContainer() {
    const classes = mainStyles();
    return (

        <main>
            <div className={classes.drawerHeader}/>
            <Typography variant="h3">
                Home Container
            </Typography>
        </main>

    )
}

export default HomeContainer;