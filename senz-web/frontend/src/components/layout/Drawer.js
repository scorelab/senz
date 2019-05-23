import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleDrawerAction } from "../../actions";
import classNames from "classnames";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Collapse
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  AddCircleSharp,
  FileCopySharp,
  DnsSharp,
  DashboardSharp,
  AccountCircleSharp,
  EditSharp,
  ExpandLess,
  ExpandMore
} from "@material-ui/icons";

const drawerWidth = 250;
const styles = theme => ({
  root: {
    display: "flex"
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  nested: {
    paddingLeft: theme.spacing.unit * 3
  },
  nestedIcon: {
    marginLeft: "5%",
    color: "#757575"
  },
  iconStyle: {
    color: "#212121"
  }
});

class DrawerHandler extends Component {
  handlePClick = e => {
    this.setState(state => ({ popen: !state.popen }));
  };
  handleDClick = e => {
    this.setState(state => ({ dopen: !state.dopen }));
  };
  handleUClick = e => {
    this.setState(state => ({ uopen: !state.uopen }));
  };
  state = {
    popen: false,
    dopen: false,
    uopen: false
  };
  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.props.open.open,
            [classes.drawerClose]: !this.props.open.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.props.open.open,
              [classes.drawerClose]: !this.props.open.open
            })
          }}
          open={this.props.open.open}
        >
          <div className={classes.toolbar}>
            <IconButton
              onClick={() => {
                this.props.toggleDrawerAction();
              }}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={this.handlePClick}>
              <ListItemIcon>
                <FileCopySharp className={classes.iconStyle} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Projects</Typography>}
              />
              {this.state.popen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.popen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon className={classes.nestedIcon}>
                    <DashboardSharp />
                  </ListItemIcon>
                  <ListItemText
                    inset
                    primary={
                      <Typography variant="subtitle1">Overview</Typography>
                    }
                  />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon className={classes.nestedIcon}>
                    <AddCircleSharp />
                  </ListItemIcon>

                  <ListItemText
                    inset
                    primary={
                      <Typography variant="subtitle1">
                        Add a new project
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={this.handleDClick}>
              <ListItemIcon>
                <DnsSharp className={classes.iconStyle} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Devices</Typography>}
              />
              {this.state.dopen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.dopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon className={classes.nestedIcon}>
                    <DashboardSharp />
                  </ListItemIcon>
                  <ListItemText
                    inset
                    primary={
                      <Typography variant="subtitle1">Overview</Typography>
                    }
                  />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon className={classes.nestedIcon}>
                    <AddCircleSharp />
                  </ListItemIcon>
                  <ListItemText
                    inset
                    primary={
                      <Typography variant="subtitle1">
                        Add a new device
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={this.handleUClick}>
              <ListItemIcon>
                <AccountCircleSharp className={classes.iconStyle} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Profile</Typography>}
              />
              {this.state.uopen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.uopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon className={classes.nestedIcon}>
                    <EditSharp />
                  </ListItemIcon>
                  <ListItemText
                    inset
                    primary={
                      <Typography variant="subtitle1">Edit Profile</Typography>
                    }
                  />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Drawer>
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
)(withStyles(styles, { withTheme: true })(DrawerHandler));
