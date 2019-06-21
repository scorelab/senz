import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Logout from "./Logout";
import { connect } from "react-redux";
import NavDropDown from "./NavDropDown";
import PropTypes from "prop-types";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#2196F3"
  },
  logoutButton: {
    marginLeft: "auto",
    marginRight: 25
  },
  navDrop: {
    marginLeft: "auto",
    marginRight: -600
  }
});

class NavBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} data-test="NavBarComponent">
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          data-test="AppBarComponent"
        >
          <Toolbar>
            <Typography variant="h6" noWrap>
              {this.props.heading}
            </Typography>
            <div className={classes.navDrop}>
              <NavDropDown />
            </div>
            <div className={classes.logoutButton}>
              <Logout />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const MapStateToProp = state => {
  return { heading: state.heading.heading };
};

NavBar.propTypes = {
  heading: PropTypes.string
};

export default connect(MapStateToProp)(
  withStyles(styles, { withTheme: true })(NavBar)
);
