import React, { Component } from "react";
import { Snackbar } from "@material-ui/core";
import PropTypes from "prop-types";

class Notifier extends Component {
  render() {
    return (
      <div data-test="NotifierComponent">
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
      </div>
    );
  }
}

Notifier.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default Notifier;
