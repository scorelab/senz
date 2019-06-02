import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Collapse
} from "@material-ui/core";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#23344e",
    color: "#fafafa"
  },
  toolbar: theme.mixins.toolbar,
  divider: {
    backgroundColor: "#ffebee",
    height: 1
  },
  nested: {
    paddingLeft: theme.spacing(4),
    color: "#eeeeee"
  },
  main: {
    fontWeight: "bold"
  },
  nestedList: {
    backgroundColor: "#2d3e58"
  },
  links: {
    textDecoration: "none"
  }
});

class SideBar extends React.Component {
  handlePClick = () => {
    this.setState(state => ({ popen: !state.popen }));
  };
  handleDClick = () => {
    this.setState(state => ({ dopen: !state.dopen }));
  };
  handleUClick = () => {
    this.setState(state => ({ uopen: !state.uopen }));
  };
  handleHClick = () => {
    this.setState(state => ({ hopen: !state.hopen }));
  };
  handleAClick = () => {
    this.setState(state => ({ aopen: !state.aopen }));
  };
  state = {
    popen: false,
    dopen: false,
    uopen: false,
    hopen: false,
    aopen: false
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />

          <Divider className={classes.divider} />
          <List>
            <ListItem button onClick={this.handlePClick}>
              <ListItemText
                primary={<Typography variant="subtitle1">Projects</Typography>}
              />
            </ListItem>
            <Collapse in={this.state.popen} timeout="auto" unmountOnExit>
              <List className={classes.nestedList}>
                <ListItem className={classes.nested} button>
                  <ListItemText>All Projects</ListItemText>
                </ListItem>
                <Link to="/addProject" className={classes.links}>
                  <ListItem className={classes.nested} button>
                    <ListItemText>New Project</ListItemText>
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </List>
          <Divider className={classes.divider} />
          <List>
            <ListItem button onClick={this.handleDClick}>
              <ListItemText
                primary={<Typography variant="subtitle1">Devices</Typography>}
              />
            </ListItem>
            <Collapse in={this.state.dopen} timeout="auto" unmountOnExit>
              <List className={classes.nestedList}>
                <ListItem className={classes.nested} button>
                  <ListItemText>All Devices</ListItemText>
                </ListItem>
                <Link to="/addDevice" className={classes.links}>
                  <ListItem className={classes.nested} button>
                    <ListItemText>Register Device</ListItemText>
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </List>
          <Divider className={classes.divider} />
          <List>
            <ListItem button onClick={this.handleUClick}>
              <ListItemText
                primary={<Typography variant="subtitle1">Profile</Typography>}
              />
            </ListItem>
            <Collapse in={this.state.uopen} timeout="auto" unmountOnExit>
              <List className={classes.nestedList}>
                <ListItem className={classes.nested} button>
                  <ListItemText>Edit Profile</ListItemText>
                </ListItem>
              </List>
            </Collapse>
          </List>
          <Divider className={classes.divider} />
          <List>
            <ListItem button onClick={this.handleHClick}>
              <ListItemText
                primary={<Typography variant="subtitle1">Help</Typography>}
              />
            </ListItem>
            <Collapse in={this.state.hopen} timeout="auto" unmountOnExit>
              <List className={classes.nestedList}>
                <ListItem className={classes.nested} button>
                  <ListItemText>Documentation</ListItemText>
                </ListItem>
              </List>
            </Collapse>
          </List>
          <Divider className={classes.divider} />
          <List>
            <ListItem button onClick={this.handleAClick}>
              <ListItemText
                primary={<Typography variant="subtitle1">About</Typography>}
              />
            </ListItem>
            <Collapse in={this.state.aopen} timeout="auto" unmountOnExit>
              <List className={classes.nestedList}>
                <ListItem className={classes.nested} button>
                  <ListItemText>Contact Us</ListItemText>
                </ListItem>
              </List>
            </Collapse>
          </List>
          <Divider className={classes.divider} />
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SideBar);
