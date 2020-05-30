import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import CastConnectedIcon from '@material-ui/icons/CastConnected';
import Grid from '@material-ui/core/Grid';
import { MainLayout } from '../layouts/main';
import { useSwitchIp } from '../utils/use-switch-ip';
import { validateIpAddress } from '../utils/validate-ip-address';
import { makeStyles } from '@material-ui/styles';
import { PAGES } from '../pages';

const useStyles = makeStyles({
  button: {
    width: '100%',
  },
});

export const MainView = ({ navigateTo }) => {
  const classes = useStyles();
  const [hasError, setHasError] = React.useState(false);
  const inputRef = React.useRef(null);
  const [switchIp, setSwitchIp] = useSwitchIp();

  const handleSetSwitchIp = () => {
    const ip = inputRef.current?.value;

    if (validateIpAddress(ip)) {
      setSwitchIp(ip);
      navigateTo(PAGES.eventReader);
    } else {
      setHasError(true);
    }
  };

  return (
    <MainLayout>
      <Grid item>
        <Typography variant="h4" align="center">
          Welcome to DenCrawler
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          Make sure to install{' '}
          <Link href="https://github.com/zaksabeast/sys-http#installing">sys-http</Link>!
        </Typography>
      </Grid>
      <Grid item>
        <form onSubmit={handleSetSwitchIp}>
          <Grid container direction="column" alignContent="center" spacing={3}>
            <Grid item>
              <TextField
                label="Switch IP Address"
                variant="outlined"
                defaultValue={switchIp}
                inputRef={inputRef}
                error={hasError}
                helperText={hasError ? 'Example: 192.168.1.120' : ''}
              />
            </Grid>
            <Grid item>
              <Button
                component="a"
                color="primary"
                variant="contained"
                startIcon={<CastConnectedIcon />}
                onClick={handleSetSwitchIp}
                className={classes.button}
              >
                Set switch IP
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </MainLayout>
  );
};
