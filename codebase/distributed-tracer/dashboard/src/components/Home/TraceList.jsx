import React, {useEffect, useState} from 'react'
import TextField from "@material-ui/core/TextField";
import {fetchTraceIDs} from '../../API/index'
import MaterialTable from "material-table";
import icons from "../../utils/Table/icons";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "calc(100% - 400px)",
        paddingTop: theme.spacing(10),
        margin: '0px auto'
    },
    textField: {
        marginBottom: theme.spacing(2),
    }
}));

export default function (props) {
    const [traceIdList, setTraceIdList] = useState([])
    const classes = useStyles()

    useEffect(_ => {
        fetchTraceIDs().then(d => setTraceIdList(d))
    }, [])
    return <div className={classes.root}>

        <TextField label="TraceID" variant="outlined" className={classes.textField}/>
        <MaterialTable
            icons={icons}
            actions={[
                {
                    icon: icons.Export,
                    tooltip: 'Save Data',
                    onClick: (event, rowData) => {
                        // Do save operation
                    }
                },
                {
                    icon: ArrowForwardIosIcon,
                    tooltip: 'Show Trace',
                    onClick: (event, rowData) => {
                        // Do save operation
                        window.location = '/tracegraph'
                    }
                }
            ]}
            title="Trace ID List"
            columns={[
                {title: 'URL', field: 'url'},
                {title: 'UUID', field: 'id'},
                {title: 'Time stamp', field: 'timestamp', type: 'datetime'},
            ]}
            data={traceIdList}
            options={{
                // filtering: true,
                actionsColumnIndex: -1
            }}
        />
    </div>
}