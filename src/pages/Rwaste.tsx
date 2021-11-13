import { makeStyles, Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import ExplorerWindow from '../components/ExplorerContainer';
import { viewerTheme } from '../viewer.utils';
const useStyles = makeStyles((theme) => ({
  affinityContainer: {
    padding: theme.spacing(3),
    minHeight: '60vh',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
    },
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(2),
    gap: theme.spacing(2),
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0),
      flexDirection: 'column',
    },
  },
  image: {
    maxWidth: '300px',
  },
  textItem: {
    marginBottom: theme.spacing(3),
  },
  itemContainer: {
    marginTop: theme.spacing(2),
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  affinityItem: {
    width: '110px',
    marginBottom: theme.spacing(2),
  },
  exampleContainer: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  header: {
    fontFamily: 'KaijuKingz',
    lineHeight: 2,
  },
}));

const Rwaste = observer((): JSX.Element => {
  const classes = useStyles(viewerTheme);

  return (
    <ExplorerWindow buttonLarge={2} buttonSmall={3} title="RWASTE (classified)">
      <div className={classes.affinityContainer}>
        <div className={classes.infoContainer}>
          <div>
            <Typography variant="h4" className={classes.header}>
              Containment procedure
            </Typography>
            <Typography variant="body1" className={classes.textItem}>
              Must be placed in appropriate container.
              <br />
              Keep the item in a dark place away from any electronic devices.
              <br />
              No hazmat suit required.
            </Typography>
            <Typography variant="h4" className={classes.header}>
              Background
            </Typography>
            <Typography variant="body1" className={classes.textItem}>
              Emanating from deep within Augminted Labs, Radioactive Waste glows in the center of the KaijuKing
              community. Fueling our project into a gigantic force much more than your average NFT project. The energy
              provided from Radioactive Waste empowers KaijuKingz with the utility to truly grow larger than ever
              imagined.
            </Typography>
          </div>
          <img src="/assets/rwaste.png" className={classes.image} />
        </div>
      </div>
    </ExplorerWindow>
  );
});

export default Rwaste;
