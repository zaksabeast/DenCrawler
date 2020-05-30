import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { parseEventFlatbuffer } from '../utils/parse-event-flatbuffer';
import { MainLayout } from '../layouts/main';
import { useSwitchIp } from '../utils/use-switch-ip';
import { fetchEventFlatbuffer } from '../utils/fetch-event-flatbuffer';
import { ButtonGridItem } from '../components/button-grid-item';

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: '100%',
  },
});

const troubleshootingMessage = `Troubleshooting:
  1. Make sure you have installed sys-http
  2. Double check your switch Ip address
  3. Be sure your game has event data
  4. Close and reopen your game (the events might not be where we expect in memory)`;

export const EventReaderView = () => {
  const [switchIp] = useSwitchIp();
  const classes = useStyles();
  const inputRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [textInputVaule, setTextInputValue] = React.useState('');

  const fetchEvents = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const eventFlatbuffer = await fetchEventFlatbuffer(switchIp);
      const parsedEvents = parseEventFlatbuffer(eventFlatbuffer);
      setTextInputValue(parsedEvents);
    } catch (error) {
      const errorMessage = `${error}\n\n${troubleshootingMessage}`;
      setTextInputValue(errorMessage);
    }

    setIsLoading(false);
  };

  const copyInputValue = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');
      inputRef.current.blur();
    }
  };

  return (
    <MainLayout>
      <Grid item>
        <Typography variant="h4" align="center">
          Read Events
        </Typography>
      </Grid>
      <Grid item className={classes.fullWidth}>
        <TextField
          label="Results"
          rows="16"
          variant="outlined"
          value={textInputVaule}
          inputRef={inputRef}
          className={classes.fullWidth}
          multiline
        />
      </Grid>
      <Grid container item justify="space-evenly">
        <ButtonGridItem>
          <Button
            color="primary"
            variant="contained"
            startIcon={<FileCopyIcon />}
            onClick={copyInputValue}
            className={classes.button}
          >
            Copy
          </Button>
        </ButtonGridItem>
        <ButtonGridItem>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              color="primary"
              variant="contained"
              onClick={fetchEvents}
              className={classes.button}
            >
              Read Events
            </Button>
          )}
        </ButtonGridItem>
      </Grid>
    </MainLayout>
  );
};
