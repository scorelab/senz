import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    backgroundColor: "rgba(33, 150, 243, 0.7)",
    color: "#fafafa",
    borderRadius: 15
  }
}));

const PaperSheet = props => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="subtitle2">{props.firstLine}</Typography>
        <Typography variant="subtitle2">{props.secondLine}</Typography>
      </Paper>
    </div>
  );
};

export default PaperSheet;
