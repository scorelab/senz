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
    backgroundColor: "#E65555"
  }
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48
  };
  state = { devices: [] };
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
  handleRow = ({ index, rowData }) => {
    if (this.state.devices.includes(index)) {
      const modDevices = this.state.devices.filter(stateIndex => {
        return index !== stateIndex;
      });
      this.setState({ devices: modDevices });
    } else {
      const modeDevices = [...this.state.devices, index];
      this.setState({ devices: modeDevices });
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
            onRowClick={this.handleRow}
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
    const rows = this.props.project.devices.map(device => {
      if (device.status) return { ...device, active: "ON" };
      else return { ...device, active: "OFF" };
    });
    return (
      <Paper style={{ height: 400, width: 800 }}>
        <VirtualizedTable
          rowCount={rows.length}
          rowGetter={({ index }) => rows[index]}
          handleCheck={this.props.handleCheck}
          columns={[
            {
              width: 200,
              label: "Name",
              dataKey: "name"
            },
            {
              width: 200,
              label: "Public Key",
              dataKey: "pubkey"
            },
            {
              width: 200,
              label: "Added On",
              dataKey: "date"
            },
            {
              width: 200,
              label: "Status",
              dataKey: "active"
            }
          ]}
        />
      </Paper>
    );
  }
}
const MapStateToProp = ({ auth, project }) => {
  return {
    user: auth.user,
    project: project.SelectedProject
  };
};

export default connect(MapStateToProp)(ReactVirtualizedTable);
