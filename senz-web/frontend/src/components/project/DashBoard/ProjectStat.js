import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider, Grid } from "@material-ui/core/";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    backgroundColor: "#23344e",
    color: "#fafafa",
    height: 170
  },
  divider: {
    backgroundColor: "#fafafa",
    height: 2
  }
}));

const PaperSheet = props => {
  const classes = useStyles();
  const { name, date, status, devices } = props.project;
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="subtitle1">Name: {name}</Typography>
        <Typography variant="subtitle1">
          Status: {status ? "ON" : "OFF"}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={7}>
            <Typography variant="subtitle2">
              No. of devices: {devices.length}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="subtitle2">
              Created on: {date.substr(0, 10)}
            </Typography>
          </Grid>
        </Grid>

        <br />
        <Divider className={classes.divider} />
        <Typography variant="body2">Project Details</Typography>
      </Paper>
    </div>
  );
};

const MapStateToProp = state => {
  return {
    project: state.project.SelectedProject
  };
};

export default connect(MapStateToProp)(PaperSheet);
