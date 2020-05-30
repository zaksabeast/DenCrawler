import React from 'react';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

export const AppBar = () => {
  const classes = useStyles();

  return (
    <MUIAppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          DenCrawler
        </Typography>
      </Toolbar>
    </MUIAppBar>
  );
};
