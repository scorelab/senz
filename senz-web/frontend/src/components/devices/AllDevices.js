import React, { Component, Fragment } from "react";
import NavBar from "../layout/NavBar";
import SideBar from "../layout/SideBar";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../_actions/heading";
import { fetchAllDeviceAction } from "../../_actions/device";
import DeviceList from "./DeviceList";
import Intro from "../project/Intro";

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    marginLeft: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  table: {
    marginLeft: 100
  }
});

//TODO: Add switch functionality
class AllDevice extends Component {
  state = {};
  componentWillMount = () => {
    //Update devices from the redux store
    this.props.toggleHeadingAction({ heading: "All Devices" });
    this.props.fetchAllDeviceAction(this.props.user.id, this.props.user.token);
    const modifiedDevice = this.props.devices.map(device => {
      if (device.status)
        return {
          ...device,
          status: "ON",
          date: device.date.substr(0, 10)
        };
      else
        return {
          ...device,
          status: "OFF",
          date: device.date.substr(0, 10)
        };
    });
    this.setState({
      devices: modifiedDevice
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NavBar />
        <SideBar />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Intro
            heading="Devices"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it."
          />
          <div className={classes.table}>
            <DeviceList devices={this.state.devices} />
          </div>
        </main>
      </Fragment>
    );
  }
}

const MapStateToProp = state => {
  return {
    user: state.auth.user,
    devices: state.device.AllDevices
  };
};

export default connect(
  MapStateToProp,
  { toggleHeadingAction, fetchAllDeviceAction }
)(withStyles(styles, { withTheme: true })(AllDevice));
