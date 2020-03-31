import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import EditIcon from '@material-ui/icons/Edit';
import EditDevice from './EditDevice';
import Switch from '@material-ui/core/Switch';
import { AutoSizer, Column, Table } from "react-virtualized";
import { switchDevice } from "../../_actions/device";
import { connect } from "react-redux";
import { toggleIsEditingDevice } from "../../_actions/device";
import { toggleHeadingAction } from "../../_actions/heading";
import ReactLoading from 'react-loading';

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
    backgroundColor: "#a2d8f5"
  }
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48
  };
  state = {
    devices: [],
    status: [],
  };
  componentDidMount() {
    // console.log(this.props);
    const status = this.props.devices.map((device)=> {
      return device.status;
    })
    this.setState({ status });
  }
  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
      [classes.selectedRow]: this.state.devices.includes(index)
    });
  };
  handleChange = (event) => {
    const newStatus = this.state.status.map((val, index) => {
      return event.target.value === index ? !val : val
    })
    this.setState({
      status: newStatus
    })
    const status = this.state.status[event.target.value] ? true : false;
    this.props.switchDevice(event.target.name, !status, this.props.user.token);
  };
  cellRenderer = ({ cellData, columnIndex, rowData }) => {
    const deviceIndex = this.props.devices.map(a => a._id)
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
        {columnIndex === 5 ? <Switch
          checked={cellData}
          name={rowData._id}
          onChange={this.handleChange}
          value={deviceIndex.indexOf(rowData._id)}
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          color="primary"
        /> : <span>{cellData}</span>}
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
  rowHeight: PropTypes.number,
  devicestatus: PropTypes.array,
  user: PropTypes.object,
  devices: PropTypes.array,
  switchDevice: PropTypes.func
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

class ReactVirtualizedTable extends Component {
  state = {
    deviceId: null,
    name: null,
    pubkey: null
  }
  async componentDidMount() {
    this.props.toggleIsEditingDevice(false);
    this.props.toggleHeadingAction({ heading: "All Devices" });
  }
  onEditIconClick = async (event, device) => {
    event.stopPropagation();
    const { _id, name, pubkey } = device;
    await this.setState({ deviceId: _id, name, pubkey });
    this.props.toggleIsEditingDevice(true);
  }
  render() {
    const rows = this.props.devices.map(device => {
      const editIcon = <EditIcon onClick={(event) => this.onEditIconClick(event, device)} />
      if (device.status)
        return { ...device, date: device.date.substr(0, 10), active: true, edit: editIcon };
      else return { ...device, date: device.date.substr(0, 10), active: false, edit: editIcon };
    });
    if (rows.length === 0) return null;
    return (<Fragment>
      {
          this.props.isEditingDevice ?
        <EditDevice
            name={this.state.name}
            pubkey={this.state.pubkey}
            deviceId={this.state.deviceId}
          />
          :
          <>
            {
              this.props.switchloading ?
                <ReactLoading type={'spinningBubbles'} color={'black'} height={40} width={40} />
                :
                <Paper
                  style={{ height: 400, width: 800 }}
                  data-test="DeviceListComponent"
                >
                  <VirtualizedTable
                    rowCount={rows.length}
                    rowGetter={({ index }) => rows[index]}
                    handleCheck={this.props.handleCheck}
                    data-test="TableComponent"
                    devices={this.props.devices}
                    user={this.props.user}
                    switchDevice={this.props.switchDevice}
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
                      },
                      {
                        width: 50,
                        dataKey: "edit"
                      }
                    ]}
                  />
                </Paper>
            }
          </>
      }
    </Fragment>);
  }
}

const MapStateToProp = state => {
  return {
    devices: state.device.AllDevices,
    isEditingDevice: state.device.isEditingDevice,
    switchloading: state.device.loading,
    user: state.auth.user
  };
};
export default connect(MapStateToProp, { toggleIsEditingDevice, toggleHeadingAction, switchDevice })(ReactVirtualizedTable);
