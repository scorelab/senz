import React, { Component } from "react";
import classNames from "classnames";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { toggleDrawerAction } from "../../actions";

const drawerWidth = 250;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  }
});

class NavBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.props.open.open
          })}
        >
          <Toolbar disableGutters={!this.props.open.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => {
                this.props.toggleDrawerAction();
              }}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.props.open.open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              SenZ
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const MapStateToProp = state => {
  return { open: state.open };
};

export default connect(
  MapStateToProp,
  { toggleDrawerAction }
)(withStyles(styles, { withTheme: true })(NavBar));
