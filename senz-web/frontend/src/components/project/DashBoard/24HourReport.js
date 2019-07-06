import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import { Bar } from "react-chartjs-2";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
});

const generator = num => {
  var arr = [];
  for (var i = 1; i <= num; i++) arr.push(String(i));
  return arr;
};

//TODO:fetch 24 hour status and feed
//TODO:Write delete device components
class HourReport extends Component {
  state = {
    data: {
      labels: generator(24),
      datasets: [
        {
          data: [
            10,
            4,
            5,
            3,
            2,
            5,
            6,
            14,
            18,
            3,
            1,
            5,
            6,
            7,
            8,
            5,
            3,
            2,
            5,
            7,
            8,
            9,
            4,
            6,
            3
          ],
          backgroundColor: "#bbdefb",
          borderColor: "#64b5f6",
          borderWidth: 1,
          label: "Total Requests"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Typography variant="h6" component="h3">
            <b>Total requests in 24 hours</b>
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

export default withStyles(styles)(HourReport);
