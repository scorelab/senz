import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    borderRadius: 15
  }
});

class NumDevices extends Component {
  state = {
    data: {
      labels: ["Online", "Offline"],
      datasets: [
        {
          data: [10, 4],
          backgroundColor: ["#bbdefb", "#64b5f6"],
          hoverBackgroundColor: ["#bbdefb", "#64b5f6"]
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
            <b>Number of Devices</b>
          </Typography>
          <br />
          <div>
            <Doughnut
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

export default withStyles(styles)(NumDevices);
