import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { AutoSizer, Column, Table } from "react-virtualized";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
  },
  links: {
    textDecoration: "none"
  }
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48
  };
  state = {
    projectId: "",
    index: -1
  };
  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
      [classes.selectedRow]: this.state.index === index
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
    if (this.state.index === index) {
      this.props.handleOpen("");
      this.setState({ index: -1, projectId: "" });
    } else {
      this.props.handleOpen(rowData._id);
      this.setState({ index, projectId: rowData._id });
    }
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

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

class ReactVirtualizedTable extends React.Component {
  render() {
    const rows = this.props.projects;
    if (rows === undefined) {
      return null;
    }
    return (
      <div data-test="ProjectListComponent">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.props.handleClick}
          >
            View
          </Button>
        </Link>
        <br />
        <br />
        <Paper style={{ height: 400, width: 800 }}>
          <VirtualizedTable
            handleOpen={this.props.handleOpen}
            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
            columns={[
              {
                width: 200,
                label: "Name",
                dataKey: "name"
              },
              {
                width: 200,
                label: "Number of Devices",
                dataKey: "devices",
                numeric: true
              },
              {
                width: 200,
                label: "Created On",
                dataKey: "date"
              },
              {
                width: 200,
                label: "Status",
                dataKey: "status"
              }
            ]}
          />
        </Paper>
      </div>
    );
  }
}

const MapStateToProp = state => {
  return {
    user: state.auth.user
  };
};

ReactVirtualizedTable.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object)
};

export default connect(MapStateToProp)(ReactVirtualizedTable);
