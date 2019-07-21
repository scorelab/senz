import React from "react";
import { Button, Menu, MenuItem, Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { LogoutAction } from "../../_actions/auth";
import { withRouter } from "react-router-dom";
function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  function handleLogout() {
    props.LogoutAction(props.history);
  }
  function handleNav() {
    props.history.push("/home");
  }
  function handlePro() {
    props.history.push("/viewProfile");
  }
  return (
    <div>
      <Button
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar alt="Remy Sharp" src={require("../../avatar.png")} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleNav}>Dashboard</MenuItem>
        <MenuItem onClick={handlePro}>My Signature</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(
  connect(
    null,
    { LogoutAction }
  )(SimpleMenu)
);
