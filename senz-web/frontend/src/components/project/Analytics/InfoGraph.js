import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchAllLog } from "../../../_actions/log";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
});

const count = (array, element) => {
  return array.filter(x => x === element).length;
};
const weeklyLabel = projectLog => {
  const response = {};
  //Get the last seven days in lastSeven array
  for (var i = 6; i >= 0; i--) {
    var date = new Date();
    var last = new Date(date.getTime() - i * 24 * 60 * 60 * 1000);
    var day = last.getDate();
    var month = last.getMonth() + 1;
    var year = last.getFullYear();
    const fullDate = day + "-" + month + "-" + year;
    response[fullDate] = [];
  }
  return new Promise((resolve, reject) => {
    projectLog.forEach((log, index, arr) => {
      const logData = new Date(log.timestamp);
      var day = logData.getDate();
      var month = logData.getMonth() + 1;
      var year = logData.getFullYear();
      const fullDate = day + "-" + month + "-" + year;
      response[fullDate].push(log.statusCode);
      if (index === arr.length - 1) {
        resolve(response);
      }
    });
  });
};
class SentReceived extends Component {
  state = {
    data: {
      labels: [],
      datasets: [
        {
          label: "first",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(187, 222, 251, 0.5)",
          borderColor: "rgba(187, 222, 251, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
          id: "first"
        },
        {
          label: "Second",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(100, 181, 246, 0.3)",
          borderColor: "rgba(100, 181, 246, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(55,202,202,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
          id: "second"
        },
        {
          label: "Third",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(100, 181, 246, 0.3)",
          borderColor: "rgba(100, 181, 246, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(55,202,202,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
          id: "third"
        },
        {
          label: "Fourth",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(100, 181, 246, 0.3)",
          borderColor: "rgba(100, 181, 246, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(55,202,202,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
          id: "fourth"
        },
        {
          label: "Fifth",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(100, 181, 246, 0.3)",
          borderColor: "rgba(100, 181, 246, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(55,202,202,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
          id: "fifth"
        },
        {
          label: "Sixth",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(100, 181, 246, 0.3)",
          borderColor: "rgba(100, 181, 246, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(55,202,202,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
          id: "sixth"
        },
        {
          label: "Seventh",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(100, 181, 246, 0.3)",
          borderColor: "rgba(100, 181, 246, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(55,202,202,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
          id: "seventh"
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false
      }
    }
  };
  componentWillMount = () => {
    const { token, signature } = this.props.user;
    const devices = this.props.project.devices.map(device => {
      return device.pubkey;
    });
    const lines = [
      "first",
      "second",
      "third",
      "fourth",
      "fifth",
      "sixth",
      "seventh"
    ];
    const codes = [500, 501, 503, 504, 505, 508, 509];
    this.props.fetchAllLog(signature, token, devices);
    weeklyLabel(this.props.statusLog).then(res => {
      const finalResponse = {};
      const dates = Object.keys(res);
      codes.forEach((statusCode, index, arr) => {
        const val0 = count(res[dates[0]], statusCode);
        const val1 = count(res[dates[1]], statusCode);
        const val2 = count(res[dates[2]], statusCode);
        const val3 = count(res[dates[3]], statusCode);
        const val4 = count(res[dates[4]], statusCode);
        const val5 = count(res[dates[5]], statusCode);
        const val6 = count(res[dates[6]], statusCode);
        finalResponse[lines[index]] = [
          val0,
          val1,
          val2,
          val3,
          val4,
          val5,
          val6
        ];
        if (index === arr.length - 1) {
          this.setState({
            data: {
              labels: dates,
              datasets: [
                {
                  label: "first",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgb(246, 131, 131)",
                  borderColor: "rgb(246, 131, 131)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgb(246, 131, 131)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgb(246, 131, 131)",
                  pointHoverBorderColor: "rgb(246, 131, 131)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: finalResponse["first"],
                  id: "first"
                },
                {
                  label: "Second",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgb(255, 197, 132)",
                  borderColor: "rgb(255, 197, 132)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgb(255, 197, 132)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgb(255, 197, 132)",
                  pointHoverBorderColor: "rgb(255, 197, 132)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: finalResponse["second"],
                  id: "second"
                },
                {
                  label: "Third",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgb(250, 227, 117)",
                  borderColor: "rgb(250, 227, 117)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgb(250, 227, 117)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgb(250, 227, 117)",
                  pointHoverBorderColor: "rgb(250, 227, 117)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: finalResponse["third"],
                  id: "third"
                },
                {
                  label: "Fourth",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgb(193, 244, 96)",
                  borderColor: "rgb(193, 244, 96)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgb(193, 244, 96)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgb(193, 244, 96)",
                  pointHoverBorderColor: "rgb(193, 244, 96)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: finalResponse["fourth"],
                  id: "fourth"
                },
                {
                  label: "Fifth",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgb(170, 252, 226)",
                  borderColor: "rgb(170, 252, 226)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgb(170, 252, 226)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgb(170, 252, 226)",
                  pointHoverBorderColor: "rgb(170, 252, 226)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: finalResponse["fifth"],
                  id: "fifth"
                },
                {
                  label: "Sixth",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgb(94, 204, 247)",
                  borderColor: "rgb(94, 204, 247)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgb(94, 204, 247)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgb(94, 204, 247)",
                  pointHoverBorderColor: "rgb(94, 204, 247)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: finalResponse["sixth"],
                  id: "sixth"
                },
                {
                  label: "Seventh",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgb(251, 166, 251)",
                  borderColor: "rgb(251, 166, 251)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgb(251, 166, 251)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgb(251, 166, 251)",
                  pointHoverBorderColor: "rgb(251, 166, 251)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: finalResponse["seventh"],
                  id: "seventh"
                }
              ]
            }
          });
        }
      });
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Typography variant="h6" component="h3">
          <b>All requests of last 7 days.</b>
        </Typography>
        <br />
        <div>
          <Line
            data={this.state.data}
            options={this.state.options}
            height={200}
          />
        </div>
      </Paper>
    );
  }
}

const styledComponent = withStyles(styles)(SentReceived);

const MapStateToProp = state => {
  return {
    statusLog: state.log.statusLogArr,
    user: state.auth.user,
    project: state.project.SelectedProject
  };
};

export default connect(
  MapStateToProp,
  { fetchAllLog }
)(styledComponent);
