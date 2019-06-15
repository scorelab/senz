import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";
import { connect } from "react-redux";

const styles = theme => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box"
  },
  tableRow: {
    cursor: "pointer"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: "initial"
  },
  header: {
    backgroundColor: "#23344e",
    color: "#fafafa"
  },
  selectedRow: {
    backgroundColor: "#55BDE6"
  }
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48
  };
  state = {
    devices: []
  };
  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
      [classes.selectedRow]: this.state.devices.includes(index)
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        <span>{cellData}</span>
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick,
          classes.header
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };
  handleClick = ({ index, rowData }) => {
    if (this.state.devices.includes(index)) {
      const modDevices = this.state.devices.filter(stateIndex => {
        return stateIndex !== index;
      });
      this.setState({ devices: modDevices });
    } else {
      const modDevices = [...this.state.devices, index];
      this.setState({ devices: modDevices });
    }
    this.props.handleCheck(rowData._id);
  };
  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
            onRowClick={this.handleClick}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

class ReactVirtualizedTable extends Component {
  render() {
    const rows = this.props.devices.map(device => {
      if (device.status)
        return { ...device, date: device.date.substr(0, 10), active: "ON" };
      else return { ...device, date: device.date.substr(0, 10), active: "OFF" };
    });
    return (
      <Paper style={{ height: 400, width: 800 }}>
        <VirtualizedTable
          rowCount={rows.length}
          rowGetter={({ index }) => rows[index]}
          handleCheck={this.props.handleCheck}
          columns={[
            {
              width: 150,
              label: "Name",
              dataKey: "name"
            },
            {
              width: 150,
              label: "Number of Sents",
              dataKey: "sent",
              numeric: true
            },
            {
              width: 150,
              label: "Number of Receives",
              dataKey: "received",
              numeric: true
            },
            {
              width: 200,
              label: "Public Key",
              dataKey: "pubkey",
              numeric: true
            },
            {
              width: 200,
              label: "Created On",
              dataKey: "date"
            },
            {
              width: 100,
              label: "Status",
              dataKey: "active"
            }
          ]}
        />
      </Paper>
    );
  }
}

const MapStateToProp = state => {
  return {
    devices: state.device.AllDevices
  };
};
export default connect(MapStateToProp)(ReactVirtualizedTable);
