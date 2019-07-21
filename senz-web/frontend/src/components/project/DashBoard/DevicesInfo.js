import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

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
  }
}));

function DenseTable(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.head}>Status</TableCell>
              <TableCell className={classes.head}>Number of devices</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Online</TableCell>
              <TableCell>{props.online}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Offline</TableCell>
              <TableCell>{props.offline}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
const MapStateToProp = state => {
  return {
    online: state.project.SelectedProject.devices.filter(device => {
      return device.status === true;
    }).length,
    offline: state.project.SelectedProject.devices.filter(device => {
      return device.status === false;
    }).length
  };
};
export default connect(MapStateToProp)(DenseTable);
