import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const NumDevices = props => {
  const classes = useStyles();
  const data = {
    labels: ["Online", "Offline"],
    datasets: [
      {
        data: [props.online, props.offline],
        backgroundColor: ["#bbdefb", "#64b5f6"],
        hoverBackgroundColor: ["#bbdefb", "#64b5f6"]
      }
    ]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h6" component="h3">
          <b>Number of Devices</b>
        </Typography>
        <br />
        <div>
          <Doughnut data={data} options={options} height={200} />
        </div>
      </Paper>
    </div>
  );
};

const MapStateToProp = state => {
  return {
    online: state.project.SelectedProject.devices.filter(device => {
      return device.status === true;
    }).length,
    offline: state.project.SelectedProject.devices.filter(device => {
      return device.status === false;
    }).length
  };
};

export default connect(MapStateToProp)(NumDevices);
