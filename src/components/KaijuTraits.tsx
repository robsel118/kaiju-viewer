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

export interface KaijuTraitProps {
  kaiju: KaijuData;
}

function KaijuTrait(props: TraitProps): JSX.Element {
  const classes = useStyles(viewerTheme);
  const store = useContext(StoreContext);

  const { descriptor, typeDisplay, trait } = props;
  const { ranks } = store;
  const traitName = trait;
  return (
    <div className={classes.traitContainer}>
      <Typography variant="caption">{`${descriptor} \n ${typeDisplay}`}</Typography>
      <br />
      <Typography
        variant="caption"
        onClick={() => ranks.search(`${typeDisplay}: ${trait}`)}
        className={classes.searchCursor}
      >
        {trait}
      </Typography>
      <br />
      <Typography variant="caption">{`${ranks.getRarityOccurence(traitName)} of 3333`}</Typography>
    </div>
  );
}

export default function KaijuTraits(props: KaijuTraitProps): JSX.Element {
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
          <KaijuTrait
            key={`${kaiju.name}-${j}`}
            descriptor={descriptor}
            typeDisplay={typeDisplay}
            occurrence={occurrence}
            name={kaiju.name}
            trait={entry.value}
          />
        );
      })}
    </Paper>
  );
}
