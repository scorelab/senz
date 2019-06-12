import React, { Component, Fragment } from "react";
import { Snackbar } from "@material-ui/core";

class Notifier extends Component {
  render() {
    return (
      <Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.props.done}
          autoHideDuration={3000}
          onClose={this.props.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.props.message}</span>}
        />
      </Fragment>
    );
  }
}

export default Notifier;
