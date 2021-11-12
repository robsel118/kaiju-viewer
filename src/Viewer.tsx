import { Container, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router } from 'react-router-dom';
import KaijuBar from './components/KaijuBar';
import Routes from './components/Routes';
import Socials from './components/Socials';
import { viewerTheme } from './viewer.utils';

const useStyles = makeStyles((theme) => ({
  siteContainer: {
    backgroundImage: `url(./assets/reactor.gif)`,
    backgroundPosition: 'center top',
    backgroundRepeat: 'none',
    backgroundSize: '115% 115%',
    backgroundColor: '#007872',
    maxWidth: '100%',
    paddingTop: theme.spacing(2),
    minHeight: '100vh',
  },
  centerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Viewer = observer((): JSX.Element => {
  const classes = useStyles(viewerTheme);
  return (
    <>
      <div className={classes.siteContainer}>
        <Container>
          <Router>
            <KaijuBar />
            <Routes />
          </Router>
          <div className={classes.centerContainer}>
            <Socials />
          </div>
        </Container>
      </div>
    </>
  );
});

export default Viewer;
