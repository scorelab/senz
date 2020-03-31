import React, { Component } from "react";
import NavBar from "../layout/NavBar";
import SideBar from "../layout/SideBar";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../_actions/heading";
import { fetchAllDeviceAction, removeDevices } from "../../_actions/device";
import DeviceList from "./DeviceList";
import Intro from "../project/Intro";
import { switchDevice } from "../../_actions/device";
import ReactLoading from 'react-loading';
const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  buttonSwitch: {
    margin: theme.spacing(1),
    color: "#2196F3",
    borderColor: "#2196F3"
  },
  buttonRemove: {
    margin: theme.spacing(1)
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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});

class AllDevice extends Component {
  state = { devices: [], status: 0 };
  handleCheck = id => {
    if (this.state.devices.includes(id)) {
      const modDevices = this.state.devices.filter(sId => {
        return sId !== id;
      });
      this.setState({ devices: modDevices });
    } else {
      const modDevices = [...this.state.devices, id];
      this.setState({ devices: modDevices });
    }
  };
  handleChange = e => {
    this.setState(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };
  handleRemove = () => {
    this.props.removeDevices(
      this.props.user.id,
      this.state.devices,
      this.props.user.token
    );
  };
  componentWillMount = () => {
    //Update devices from the redux store
    this.props.toggleHeadingAction({ heading: "All Devices" });
    this.props.fetchAllDeviceAction(this.props.user.id, this.props.user.token);
  };
  render() {
    const { classes } = this.props;
    const newStatus = this.props.devices ? this.props.devices.map(a => {
      return a.status
    }) : []
    return (
      <>
        <div data-test="AllDevicesComponent">
          <NavBar />
          <SideBar />

          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Intro
              heading="Devices"
              description="Each entry contains the name,public key,number of times data sent and received of a device along with their status. You can switch a device ON or OFF and the same will be reflected while sending data using the senz switch."
            />
            <div className={classes.table}>
              {
                this.props.devicesLoading ?
                  <ReactLoading type={'spinningBubbles'} color={'black'} height={40} width={40} />
                  : <DeviceList devicestatus={newStatus} user={this.props.user} />
              }

            </div>
          </main>
        </div>
      </>
    );
  }
}

const MapStateToProp = state => {
  return {
    project: state.project.SelectedProject,
    user: state.auth.user,
    devices: state.device.AllDevices,
    devicesLoading: state.device.loading
  };
};

export default connect(MapStateToProp, {
  toggleHeadingAction,
  fetchAllDeviceAction,
  switchDevice,
  removeDevices
})(withStyles(styles, { withTheme: true })(AllDevice));
