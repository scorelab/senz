import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
});
class SentReceived extends Component {
  state = {
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Data Received",
          fill: true,
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
          data: [65, 59, 80, 81, 56, 55, 40],
          id: "received"
        },
        {
          label: "Data Sent",
          fill: true,
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
          data: [45, 39, 20, 81, 96, 65, 40],
          id: "sent"
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Typography variant="h6" component="h3">
          <b>Monthly Data Sent and Received</b>
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

export default withStyles(styles)(SentReceived);
