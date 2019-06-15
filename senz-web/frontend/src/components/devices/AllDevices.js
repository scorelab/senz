import React, { Component, Fragment } from "react";
import NavBar from "../layout/NavBar";
import SideBar from "../layout/SideBar";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../_actions/heading";
import { fetchAllDeviceAction } from "../../_actions/device";
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
  button: {
    margin: theme.spacing(1),
    color: "#2196F3",
    borderColor: "#2196F3"
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

//TODO: Remove wrong status display bug
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
                className={classes.button}
                onClick={this.handleSwitch}
              >
                Switch
              </Button>
            </form>
            <DeviceList handleCheck={this.handleCheck} />
          </div>
        </main>
      </Fragment>
    );
  }
}

const MapStateToProp = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  MapStateToProp,
  { toggleHeadingAction, fetchAllDeviceAction, switchDevice }
)(withStyles(styles, { withTheme: true })(AllDevice));
