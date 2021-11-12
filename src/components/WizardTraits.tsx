import { makeStyles, Paper, Typography } from '@material-ui/core';
import { useContext } from 'react';
import { KaijuData } from '../interface/kaiju-data.interface';
import store from '../store/RootStore';
import { StoreContext } from '../store/StoreContext';
import { getRarityDescriptor, viewerTheme } from '../viewer.utils';

const useStyles = makeStyles((theme) => ({
  traitsPaper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    backgroundColor: '#5c64ac',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  traitContainer: {
    textAlign: 'center',
    flexBasis: '50%',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  searchCursor: {
    cursor: 'pointer',
  },
}));

interface TraitProps {
  trait: string;
  descriptor: string;
  typeDisplay: string;
  name: string;
  occurrence: number;
}

export interface WizardTraitProps {
  kaiju: KaijuData;
}

function WizardTrait(props: TraitProps): JSX.Element {
  const classes = useStyles(viewerTheme);
  const store = useContext(StoreContext);

  const { descriptor, typeDisplay, name, trait } = props;
  const { ranks } = store;
  return (
    <div className={classes.traitContainer}>
      <Typography variant="caption">{`${descriptor} ${typeDisplay}`}</Typography>
      <Typography variant="body1" onClick={() => ranks.search(trait)} className={classes.searchCursor}>
        {name}
      </Typography>
      <Typography variant="caption">{`${ranks.getRarityOccurence(trait)} of 10,000`}</Typography>
    </div>
  );
}

export default function WizardTraits(props: WizardTraitProps): JSX.Element {
  const classes = useStyles(viewerTheme);
  const { kaiju } = props;
  const { ranks } = store;

  return (
    <Paper className={classes.traitsPaper}>
      {kaiju.traits.map((entry, j) => {
        const traitName = entry.trait_type;
        const traitValue = entry.value;

        const typeDisplay = traitName;
        const occurrence = ranks.getRarityOccurence(traitValue);
        const rarity = ranks.getRarity(traitValue);
        const descriptor = getRarityDescriptor(rarity);
        return (
          <WizardTrait
            key={`${kaiju.name}-${j}`}
            descriptor={descriptor}
            typeDisplay={typeDisplay}
            occurrence={occurrence}
            name={kaiju.name}
            trait={traitName}
          />
        );
      })}
    </Paper>
  );
}
