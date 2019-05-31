import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Checkbox
} from "@material-ui/core";

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

const styles = theme => ({
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
});

class DeviceList extends Component {
  state = {
    devices: [
      {
        name: "device1",
        key: "27y1ehwd72",
        date: "23-05-2019",
        status: "offline"
      },
      {
        name: "device2",
        key: "27y1essd78",
        date: "30-05-2019",
        status: "online"
      },
      {
        name: "device3",
        key: "27y1ehwd72",
        date: "23-05-2019",
        status: "online"
      }
    ]
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.tableHead} />
              <StyledTableCell className={classes.tableHead}>
                Name
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                Public Key
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                Created On
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                Status
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.devices.map((device, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      value={device.name}
                      onChange={this.handleChange}
                    />
                  </TableCell>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>{device.key}</TableCell>
                  <TableCell>{device.date}</TableCell>
                  <TableCell>{device.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DeviceList);
