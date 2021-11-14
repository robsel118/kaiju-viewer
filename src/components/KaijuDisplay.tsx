import { makeStyles, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { KaijuData } from '../interface/kaiju-data.interface';
import { StoreContext } from '../store/StoreContext';
import { getAffinityRarityColor, getRarityColor, getRarityDescriptor, viewerTheme } from '../viewer.utils';

const useStyles = makeStyles((theme) => ({
  kaijuDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '440px',
    backgroundPosition: 'center bottom 60px',
    backgroundRepeat: 'no-repeat',
  },
  spriteContainer: {
    height: 'auto',
    width: '100%',
    maxWidth: '250px',
    marginBottom: 0,
  },
  traitContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(2),
    color: '#e0decc',
  },
  traitItem: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    justifyContent: 'space-between',
  },
  descriptor: {
    flexBasis: '60%',
  },
  section: {
    paddingBottom: theme.spacing(1),
  },
  rankDisplay: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexContainer: {
    display: 'flex',
  },
  rankContainer: {
    justifyContent: 'space-around',
  },
  rarity: {
    paddingTop: theme.spacing(-0.25),
    fontWeight: 700,
  },
  infoContainer: {
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
  },
  kaiju: {
    fontFamily: 'KaijuKingz',
  },
}));

const KaijuDisplay = observer((): JSX.Element | null => {
  const classes = useStyles(viewerTheme);
  const store = useContext(StoreContext);
  const { state, ranks } = store;
  const { displayRanking, totalKaijus } = ranks;

  const random = Math.floor(Math.random() * (totalKaijus - 0)) + 0;
  const [kaiju, setKaiju] = useState<KaijuData>(displayRanking[random]);
  useEffect(() => {
    if (state.kaiju) {
      setKaiju(displayRanking[state.kaiju - 1]);
    } else {
      setKaiju(displayRanking[random]);
    }
  }, [state.kaiju, displayRanking, ranks.showUser]);

  const image = kaiju.image;
  const rank = kaiju.rank || Number(kaiju.tokenId);
  const rankStyle = { color: getAffinityRarityColor(rank / totalKaijus) };

  return (
    <div className={classes.kaijuDisplay}>
      <div className={classes.spriteContainer}>
        <img key={image} src={image} className={classes.spriteContainer} />
      </div>
      <Paper className={classes.traitContainer}>
        <Typography
          variant="body1"
          align="center"
          style={rankStyle}
          className={clsx(classes.kaiju, state.kaiju ? classes.section : undefined)}
        >
          {kaiju.name}
        </Typography>
        {!state.kaiju && (
          <Typography variant="caption" align="center" className={!state.kaiju ? classes.section : undefined}>
            (Randomly slected Kaiju)
          </Typography>
        )}
        <div className={classes.infoContainer}>
          <div className={clsx(classes.section, classes.flexContainer, classes.rankContainer)}>
            <div className={classes.rankDisplay}>
              <Typography variant="caption" align="center">
                Serial ID
              </Typography>
              <Typography variant="caption" align="center">
                {kaiju.tokenId}
              </Typography>
            </div>
            <div className={classes.rankDisplay}>
              <Typography variant="caption" align="center">
                Rank
              </Typography>
              <Typography variant="caption" align="center">
                {kaiju.virtualRank}
              </Typography>
            </div>
            <div className={classes.rankDisplay}>
              <Typography variant="caption" align="center">
                Score
              </Typography>
              <Typography variant="caption" align="center">
                {kaiju.score?.total.toFixed(2)}
              </Typography>
            </div>
          </div>
          <Typography variant="body1" align="center" className={classes.section}>
            Traits
          </Typography>
          <div className={classes.section}>
            {kaiju.traits.map((trait, i) => {
              const traitType = trait.trait_type;
              const traitName = trait.value;
              const traitRarity = getRarityDescriptor(ranks.getRarity(traitName));
              const traitColor = getRarityColor(ranks.getRarity(traitName));
              const traitStyle = { color: traitColor };
              const traitCount = ranks.getRarityOccurence(traitName);
              return (
                <div key={`trait-${i}`} className={classes.traitItem}>
                  <div className={classes.descriptor}>
                    <Typography variant="body2" align="left">
                      {traitType.charAt(0).toUpperCase() + traitType.slice(1)} ({traitCount})
                    </Typography>
                    <Typography variant="body2" align="left" style={traitStyle} className={classes.rarity}>
                      {traitRarity}
                    </Typography>
                  </div>
                  <Typography variant="body2" align="right">
                    {traitName}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      </Paper>
    </div>
  );
});

export default KaijuDisplay;
