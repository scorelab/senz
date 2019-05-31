import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import DashBoard from "../project/DashBoard/DashBoard";
import Devices from "../project/Devices/Devices";
import Analytics from "../project/Analytics/Analytics";
import Settings from "../project/Settings/Settings";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 1 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#2196F3" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Dashboard" />
          <Tab label="Devices" />
          <Tab label="Analytics" />
          <Tab label="Settings" />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <DashBoard />
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <Devices />
        </TabContainer>
      )}
      {value === 2 && (
        <TabContainer>
          <Analytics />
        </TabContainer>
      )}
      {value === 3 && (
        <TabContainer>
          <Settings />
        </TabContainer>
      )}
    </div>
  );
}

export default SimpleTabs;
