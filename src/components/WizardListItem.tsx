import {
  Avatar,
  Collapse,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  useMediaQuery,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { baseUrl, ref } from '../config/constants';
import { KaijuData } from '../interface/kaiju-data.interface';
import { StoreContext } from '../store/StoreContext';
import { getRarityDescriptor, viewerTheme } from '../viewer.utils';
import WizardTraits from './WizardTraits';

const useStyles = makeStyles((theme) => ({
  wizardListItem: {
    backgroundColor: '#859d92',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  wizardListContainer: {
    marginBottom: theme.spacing(4),
  },
  rank: {
    marginRight: theme.spacing(2),
    width: '35px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '20px',
    },
  },
  baseContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  wizardContainer: {
    minWidth: '100px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
  infoItem: {
    width: '145px',
    overflow: 'wrap',
    marginLeft: theme.spacing(1.5),
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  avatar: {
    [theme.breakpoints.down('sm')]: {
      height: '20px',
      width: '20px',
      display: 'flex',
      marginRight: theme.spacing(-2.5),
    },
  },
}));

export interface WizardListItemProps {
  kaiju: KaijuData;
}

const WizardListItem = observer((props: WizardListItemProps): JSX.Element => {
  const isMobile = useMediaQuery(viewerTheme.breakpoints.down('sm'));
  const classes = useStyles();
  const { kaiju } = props;

  const store = useContext(StoreContext);
  const { ranks, state } = store;
  const { rank } = kaiju;

  const traitCountRarity = getRarityDescriptor(ranks.getCountRarity(kaiju.traitCount));

  return (
    <>
      <ListItem
        dense
        divider
        button
        component={Paper}
        className={classes.wizardListItem}
        onClick={() => state.setWizard(rank)}
      >
        <div className={clsx(classes.baseContainer, classes.wizardContainer)}>
          <ListItemText primary={`${rank}.`} className={classes.rank} />
          <ListItemAvatar>
            <Avatar alt={`${kaiju.name} Avatar`} src={kaiju.image} />
          </ListItemAvatar>
          <ListItemText primary={kaiju.name} secondary={`Serial: ${kaiju.tokenId}`} />
        </div>
        <div className={classes.baseContainer}>
          {/* <ListItemText
            primary={`${affinityRarity} Affinity`}
            secondary={`${kaiju.traitCount - 1} traits`}
            className={classes.infoItem}
          /> */}
          <ListItemText
            primary={`${traitCountRarity} Trait Count`}
            secondary={`${kaiju.traitCount} traits`}
            className={classes.infoItem}
          />
          <ListItemAvatar className={classes.avatar}>
            <IconButton onClick={() => window.open(`${baseUrl}${kaiju.tokenId}${ref}`)}>
              <ExitToAppIcon />
            </IconButton>
          </ListItemAvatar>
        </div>
      </ListItem>
      {isMobile && (
        <Collapse key={`collapse-${kaiju.rank}`} in={state.kaiju === rank} unmountOnExit>
          <WizardTraits kaiju={kaiju} />
        </Collapse>
      )}
    </>
  );
});

export default WizardListItem;
