import React, { Component } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DeviceChart from "./DeviceChart";
import classNames from "classnames";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#2196F3"
  },
  main: {
    padding: 20
  },
  sub: {
    marginTop: 15,
    marginLeft: 300
  }
});
class ActionSelector extends Component {
  state = {
    status: 0,
    data: this.props.devices[0].requests
  };
  handleChange = e => {
    this.setState(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
        data: this.props.devices[e.target.value].requests
      };
    });
  };
  render() {
    const { classes } = this.props;
    const MenuList = this.props.devices.map((device, index) => {
      return (
        <MenuItem key={index} value={index}>
          {device.name}
        </MenuItem>
      );
    });
    return (
      <Paper className={classes.main}>
        <form
          className={classNames(classes.root, classes.sub)}
          autoComplete="off"
        >
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="Action">Device Name</InputLabel>
            <Select
              value={this.state.status}
              onChange={this.handleChange}
              inputProps={{
                name: "status",
                id: "Action"
              }}
            >
              {MenuList}
            </Select>
          </FormControl>
        </form>
        <div className={classes.sub}>
          <DeviceChart data={this.state.data} />
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ActionSelector);
