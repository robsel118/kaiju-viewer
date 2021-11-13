import {
  Avatar,
  Collapse,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
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
import KaijuTraits from './KaijuTraits';

const useStyles = makeStyles((theme) => ({
  kaijuListItem: {
    backgroundColor: '#748C7B',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: '#859d92',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  kaijuListContainer: {
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
  kaijuContainer: {
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

export interface KaijuListItemProps {
  kaiju: KaijuData;
}

const KaijuListItem = observer((props: KaijuListItemProps): JSX.Element => {
  const isMobile = useMediaQuery(viewerTheme.breakpoints.down('sm'));
  const classes = useStyles();
  const { kaiju } = props;

  const store = useContext(StoreContext);
  const { ranks, state } = store;
  const { rank, virtualRank } = kaiju;

  const traitCountRarity = getRarityDescriptor(ranks.getCountRarity(kaiju.traitCount));

  return (
    <>
      <ListItem dense divider button className={classes.kaijuListItem} onClick={() => state.setKaiju(rank)}>
        <div className={clsx(classes.baseContainer, classes.kaijuContainer)}>
          <ListItemText primary={`${virtualRank}.`} className={classes.rank} />
          <ListItemAvatar>
            <Avatar alt={`${kaiju.name} Avatar`} src={kaiju.image} />
          </ListItemAvatar>
          <ListItemText primary={kaiju.name} secondary={`Token ID: ${kaiju.tokenId}`} />
        </div>
        <div className={classes.baseContainer}>
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
          <KaijuTraits kaiju={kaiju} />
        </Collapse>
      )}
    </>
  );
});

export default KaijuListItem;
