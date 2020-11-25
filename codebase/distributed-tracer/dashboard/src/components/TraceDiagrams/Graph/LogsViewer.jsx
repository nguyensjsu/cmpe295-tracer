import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
    root: {}
}));

export const LogsViewer = ({allLogs, logs}) => {
    const classes = useStyles();

    const findRequest = (res) => {
        let req = logs.find(l => l.spanId.split("|")[1] === res.spanId.split("|")[1])
        return req ? {...req, log_type: "RESPONSE"} : {}
    }

    const findInBoundApp = (log) => {
        return allLogs.find(l => l.spanId.split("|")[1] === log.spanId.split("|")[1] && log.appName !== l.appName && l.log_type === "REQUEST")
    }

    return (
        <div className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Method</TableCell>
                        <TableCell>Path</TableCell>
                        <TableCell colSpan={3}>Direction</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        logs.filter(log => log.log_type === "REQUEST")
                            .map((log, i) => {
                                let method = ""
                                let path = ""
                                let appName = ""
                                let bound = ""

                                if (log.upstream_cluster.split("|")[0] === "inbound") {
                                    let l = log.spanId.split("|")[1] === "EMPTY" ? log : findInBoundApp(log)
                                    method = l.method
                                    path = l.path
                                    bound = "inbound"
                                    appName = log.spanId.split("|")[1] !== "EMPTY" ? l.appName : l.authority
                                } else {
                                    method = log.method
                                    path = log.path
                                    bound = "outbound"
                                    appName = log.authority
                                }
                                return <TableRow key={i}>
                                    <TableCell>{method}</TableCell>
                                    <TableCell>{path}</TableCell>
                                    <TableCell>{log.appName}</TableCell>
                                    <TableCell><Icon>{bound === "inbound" ? <ArrowBackIcon/> :
                                        <ArrowForwardIcon/>}</Icon></TableCell>
                                    <TableCell>{appName}</TableCell>
                                </TableRow>

                            })
                    }
                </TableBody>
            </Table>
        </div>
    );
}

