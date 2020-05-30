import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';
import { AppBar } from '../components/app-bar';

const useStyles = makeStyles({
  content: {
    margin: 'auto',
  },
});

export const MainLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar />
      <Grid
        container
        item
        className={classes.content}
        justify="center"
        alignItems="center"
        direction="column"
        spacing={6}
        xs={12}
        sm={8}
        md={6}
      >
        {children}
      </Grid>
    </>
  );
};
