import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { fetchProjectBasedLog } from "../../../_actions/log";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
});

//TODO:Write delete device components
const weeklyLabel = projectLog => {
  const lastSeven = [];
  const response = {};
  //Get the last seven days in lastSeven array
  for (var i = 0; i < 7; i++) {
    var date = new Date();
    var last = new Date(date.getTime() - i * 24 * 60 * 60 * 1000);
    var day = last.getDate();
    var month = last.getMonth() + 1;
    var year = last.getFullYear();
    const fullDate = day + "-" + month + "-" + year;
    lastSeven.push(fullDate);
    response[fullDate] = 0;
  }
  return new Promise((resolve, reject) => {
    projectLog.forEach((log, index, arr) => {
      const logData = new Date(log.timestamp);
      var day = logData.getDate();
      var month = logData.getMonth() + 1;
      var year = logData.getFullYear();
      const fullDate = day + "-" + month + "-" + year;
      //Check if the log date belongs to the last week
      if (lastSeven.includes(fullDate)) {
        response[fullDate] += 1;
      }
      if (index === arr.length - 1) {
        resolve(response);
      }
    });
  });
};
class HourReport extends Component {
  state = {
    data: {
      labels: null,
      datasets: [
        {
          data: [],
          backgroundColor: "#bbdefb",
          borderColor: "#64b5f6",
          borderWidth: 1,
          label: "Total Requests"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            stacked: true,
            ticks: {
              min: 0,
              stepSize: 1
            }
          }
        ]
      }
    }
  };
  componentDidMount = () => {
    const { token, signature } = this.props.user;
    const devices = this.props.project.devices.map(device => {
      return device.pubkey;
    });
    this.props.fetchProjectBasedLog(signature, devices, token);
    weeklyLabel(this.props.projectLog).then(res => {
      const updatedData = Object.values(res);
      const updatedLabel = Object.keys(res);
      this.setState({
        data: {
          labels: updatedLabel,
          datasets: [
            {
              data: updatedData,
              backgroundColor: "#bbdefb",
              borderColor: "#64b5f6",
              borderWidth: 1,
              label: "Total Requests"
            }
          ]
        }
      });
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Typography variant="h6" component="h3">
            <b>Successful requests in the last 7 days.</b>
          </Typography>
          <br />
          <div>
            <Bar
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

const MapStateToProp = state => {
  return {
    projectLog: state.log.projectLogArr,
    user: state.auth.user,
    project: state.project.SelectedProject
  };
};

const styledComponent = withStyles(styles)(HourReport);

export default connect(
  MapStateToProp,
  { fetchProjectBasedLog }
)(styledComponent);
