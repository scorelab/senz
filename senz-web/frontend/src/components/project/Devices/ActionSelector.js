import React, { Component } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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
    color: "#2196F3",
    borderColor: "#2196F3"
  },
  remButton: {
    margin: theme.spacing(1)
  }
});
class ActionSelector extends Component {
  state = {
    status: 0
  };
  handleChange = e => {
    this.setState(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="Action">
            {this.state.status === 0 ? "Offline" : "Online"}
          </InputLabel>
          <Select
            value={this.state.status}
            onChange={this.handleChange}
            inputProps={{
              name: "status",
              id: "Action"
            }}
          >
            <MenuItem value={0}>Offline</MenuItem>
            <MenuItem value={1}>Online</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" color="primary" className={classes.button}>
          Switch
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          className={classes.remButton}
        >
          Remove Device
        </Button>
      </form>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ActionSelector);
