import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { AutoSizer, Column, Table } from "react-virtualized";

//TODO: solve duplicate rows bug
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
  }
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    });
  };
  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;

    if (columnIndex === 0) {
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
          <Checkbox
            value="checkedA"
            inputProps={{
              "aria-label": "primary checkbox"
            }}
            onChange={this.props.handleCheck(cellData)}
          />
        </TableCell>
      );
    } else {
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
    }
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
  rowHeight: PropTypes.number
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

function ReactVirtualizedTable(props) {
  const rows = props.devices;
  return (
    <Paper style={{ height: 400, width: 800 }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        handleCheck={props.handleCheck}
        columns={[
          {
            width: 100,
            dataKey: "index",
            type: Number
          },
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
            dataKey: "status"
          }
        ]}
      />
    </Paper>
  );
}

export default ReactVirtualizedTable;
