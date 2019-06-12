import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider } from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    backgroundColor: "#23344e",
    color: "#fafafa"
  },
  divider: {
    backgroundColor: "#fafafa",
    height: 2
  }
}));

const PaperSheet = props => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="subtitle1">{props.firstLine}</Typography>
        <Typography variant="subtitle1">{props.secondLine}</Typography>
        <br />
        <Divider className={classes.divider} />
        <Typography variant="body2">{props.heading}</Typography>
      </Paper>
    </div>
  );
};

export default PaperSheet;
