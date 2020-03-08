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
import {
  FormControl,
  MenuItem,
  Button,
  InputLabel,
  Select
} from "@material-ui/core";
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
  }
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
  handleSwitch = () => {
    const status = this.state.status ? true : false;
    this.props.switchDevice(this.state.devices, status, this.props.user.token);
  };
  render() {
    const { classes } = this.props;
    return (
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
            <form className={classes.root} autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="Action">
                  {this.state.status === 0 ? "OFF" : "ON"}
                </InputLabel>
                <Select
                  value={this.state.status}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "status",
                    id: "Action"
                  }}
                >
                  <MenuItem value={0}>OFF</MenuItem>
                  <MenuItem value={1}>ON</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonSwitch}
                onClick={this.handleSwitch}
              >
                Switch
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.buttonRemove}
                onClick={this.handleRemove}
              >
                Remove
              </Button>
            </form>
            <DeviceList handleCheck={this.handleCheck} />
          </div>
        </main>
      </div>
    );
  }
}

const MapStateToProp = state => {
  return {
    project: state.project.SelectedProject,
    user: state.auth.user
  };
};

export default connect(MapStateToProp, {
  toggleHeadingAction,
  fetchAllDeviceAction,
  switchDevice,
  removeDevices
})(withStyles(styles, { withTheme: true })(AllDevice));
