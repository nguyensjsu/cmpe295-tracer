import React, {useEffect, useState} from 'react'
import TextField from "@material-ui/core/TextField";
import {fetchTraceIDs} from '../../API'
import MaterialTable from "material-table";
import icons from "../../utils/Table/icons";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import SearchAppBar from "../AppBar";

const useStyles = makeStyles((theme) => ({
    root: {
        // width: "calc(100% - 200px)",
        // paddingTop: theme.spacing(10),
        // margin: '0px auto'
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
        <SearchAppBar/>
        <MaterialTable
            icons={icons}
            actions={[
                {
                    icon: ArrowForwardIosIcon,
                    tooltip: 'Show Trace',
                    onClick: (event, rowData) => {
                        window.location = '/#/trace-graph/' + rowData.id
                    }
                }
            ]}
            title="Trace ID List"
            columns={[
                {title: 'Entrypoint URL', field: 'url'},
                {title: 'Request Identifier', field: 'id'},
                {title: 'Request Start Time', field: 'timestamp', type: 'datetime'},
            ]}
            data={traceIdList}
            options={{
                filtering: true,
                // padding: "dense",
                search: false,
                pageSize: 20,
                actionsColumnIndex: -1
            }}
        />
    </div>
}