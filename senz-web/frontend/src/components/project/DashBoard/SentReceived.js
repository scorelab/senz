import React, { Component } from "react";
import { Polar } from "react-chartjs-2";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchProjectBasedLog } from "../../../_actions/log";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
});

class SentReceived extends Component {
  state = {
    data: {
      datasets: [
        {
          data: [11, 16],
          backgroundColor: ["#bbdefb", "#64b5f6"],
          hoverBackgroundColor: ["#bbdefb", "#64b5f6"],
          label: "My dataset" // for legend
        }
      ],
      labels: ["Sent", "Received"]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  };
  componentWillMount = () => {
    const { token, signature } = this.props.user;
    const devices = this.props.project.devices.map(device => {
      return device.pubkey;
    });
    this.props.fetchProjectBasedLog(signature, devices, token);
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Typography variant="h6" component="h3">
            <b>Send and Receive Requests</b>
          </Typography>
          <br />
          <div>
            <Polar
              data={this.state.data}
              options={this.state.options}
              height={200}
            />
          </div>
        </Paper>
      </div>
    );
  }
}
const styledComponent = withStyles(styles)(SentReceived);
const MapStateToProp = state => {
  return {
    projectLog: state.log.projectLogArr,
    user: state.auth.user,
    project: state.project.SelectedProject
  };
};

export default connect(
  MapStateToProp,
  { fetchProjectBasedLog }
)(styledComponent);
