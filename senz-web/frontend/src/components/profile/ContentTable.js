import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from "@material-ui/core/styles";
import { FileCopyOutlined } from "@material-ui/icons";
import Notifier from "../Notifier";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  headContent: {
    backgroundColor: "#23344e",
    color: "white",
    fontSize: 15
  }
});

class ContentTable extends Component {
  state = {
    copied: false,
    value: this.props.signature
  };
  handleClose = () => {
    this.setState({ copied: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead className={classes.headContent}>
              <TableRow>
                <TableCell className={classes.headContent}>Email</TableCell>
                <TableCell className={classes.headContent}>Name</TableCell>
                <TableCell className={classes.headContent}>Signature</TableCell>
                <TableCell className={classes.headContent} />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{this.props.email}</TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.signature}</TableCell>
                <TableCell>
                  <CopyToClipboard
                    text={this.state.value}
                    onCopy={() => this.setState({ copied: true })}
                  >
                    <span>
                      <FileCopyOutlined />
                    </span>
                  </CopyToClipboard>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <Notifier
          message="Signature Copied"
          done={this.state.copied}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withStyles: true })(ContentTable);
