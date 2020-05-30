import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './views/main';
import { EventReaderView } from './views/event-reader';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { PAGES } from './pages';

const theme = createMuiTheme({});

const App = () => {
  // This will be hosted on github pages, so we don't want to use a library that will change the url a user can copy/paste/share
  const [currentPage, setCurrentPage] = React.useState(PAGES.home);

  const content =
    currentPage === PAGES.home ? <MainView navigateTo={setCurrentPage} /> : <EventReaderView />;

  return <ThemeProvider theme={theme}>{content}</ThemeProvider>;
};

ReactDOM.render(<App />, document.getElementById('root'));
