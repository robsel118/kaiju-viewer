import { makeStyles } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import KaijuList from '../pages/KaijuList';
import Rwaste from '../pages/Rwaste';
import { viewerTheme } from '../viewer.utils';

const useStyles = makeStyles((theme) => ({
  computerFrame: {
    [theme.breakpoints.up('sm')]: {
      border: '36px ridge #32344C',
      borderWidth: '36px 24px',
      padding: theme.spacing(3),
      background: `repeating-linear-gradient(
        0deg,
        #70E0C7,
        #70E0C7 10px,
        #E9FCF8 10px,
        #E9FCF8 20px
        );`,
    },
  },
  explorerWindow: {
    border: '12px solid #748C7B',
    background: '#FFF',
  },
  explorerTab: {
    background: '#748C7B',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0 1rem 0',
  },
  explorerButtonSmall: {
    background: '#FFF',
    width: 8,
    height: 8,
  },
  explorerButtonLarge: {
    background: '#FFF',
    width: 24,
    height: 8,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
  explorerContent: {
    padding: theme.spacing(2),
  },
}));
export default function Routes(): JSX.Element {
  const classes = useStyles(viewerTheme);

  return (
    <div className={classes.computerFrame}>
      <Switch>
        <Route exact path="/">
          <KaijuList />
        </Route>
        <Route path="/rwaste">
          <Rwaste />
        </Route>
      </Switch>
    </div>
  );
}
