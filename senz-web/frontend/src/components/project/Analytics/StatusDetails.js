import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing(2),
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 440
  },
  head: {
    backgroundColor: "#23344e",
    color: "#fafafa"
  },
  represent: {
    backgroundColor: "#23344e"
  },
  first: {
    backgroundColor: "#F68383",
    width: 25,
    height: 10,
    float: "right",
    marginTop: 5
  },
  second: {
    backgroundColor: "#FFC584",
    width: 25,
    height: 10,
    float: "right",
    marginTop: 5
  },
  third: {
    backgroundColor: "#FAE375",
    width: 25,
    height: 10,
    float: "right",
    marginTop: 5
  },
  fourth: {
    backgroundColor: "#C1F460",
    width: 25,
    height: 10,
    float: "right",
    marginTop: 5
  },
  fifth: {
    backgroundColor: "#AAFCE2",
    width: 25,
    height: 10,
    float: "right",
    marginTop: 5
  },
  sixth: {
    backgroundColor: "#5ECCF7",
    width: 25,
    height: 10,
    float: "right",
    marginTop: 5
  },
  seventh: {
    backgroundColor: "#FBA6FB",
    width: 25,
    height: 10,
    float: "right",
    marginTop: 5
  }
}));

export default function DenseTable() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.head}>Status</TableCell>
              <TableCell className={classes.head}>Meaning</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                500
                <div className={classes.first} />
              </TableCell>
              <TableCell>OK.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                501
                <div className={classes.second} />
              </TableCell>
              <TableCell>Signature not authorised.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                503
                <div className={classes.third} />
              </TableCell>
              <TableCell>Devices not compatible.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                504
                <div className={classes.fourth} />
              </TableCell>
              <TableCell>Device not valid.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                505
                <div className={classes.fifth} />
              </TableCell>
              <TableCell>Sender and receiver same.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                508
                <div className={classes.sixth} />
              </TableCell>
              <TableCell>Syntax not correct.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                509
                <div className={classes.seventh} />
              </TableCell>
              <TableCell>Devices offline.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
