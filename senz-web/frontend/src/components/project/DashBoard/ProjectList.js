import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles(theme => ({
  head: {
    borderBottom: "2px solid #bbdefb",
    color: theme.palette.common.black,
    height: 10
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    borderRadius: 15
  },
  table: {
    minWidth: 700
  },
  tableHead: {
    fontWeight: "bold"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

function CustomizedTables(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.tableHead}>
              Serial No.
            </StyledTableCell>
            <StyledTableCell className={classes.tableHead} align="right">
              Name
            </StyledTableCell>
            <StyledTableCell className={classes.tableHead} align="right">
              Number of Devices
            </StyledTableCell>
            <StyledTableCell className={classes.tableHead} align="right">
              Created On
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell align="right">{props.name}</TableCell>
            <TableCell align="right">{props.devices}</TableCell>
            <TableCell align="right">{props.date}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

export default CustomizedTables;
