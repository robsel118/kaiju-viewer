import { makeStyles, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { KaijuData } from '../interface/kaiju-data.interface';
import { StoreContext } from '../store/StoreContext';
import { getAffinityRarityColor, getRarityColor, getRarityDescriptor, viewerTheme } from '../viewer.utils';

const useStyles = makeStyles((theme) => ({
  wizardDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '440px',
    backgroundPosition: 'center bottom 60px',
    backgroundRepeat: 'no-repeat',
  },
  spriteContainer: {
    marginTop: theme.spacing(1),
    height: 'auto',
    width: '100%',
    maxWidth: '250px',
    marginBottom: 'auto',
  },
  traitContainer: {
    marginTop: theme.spacing(2),
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
  }, [state.kaiju, displayRanking]);

  const image = kaiju.image;
  const rank = kaiju.rank || Number(kaiju.tokenId);
  const rankStyle = { color: getAffinityRarityColor(rank / totalKaijus) };

  return (
    <div className={classes.wizardDisplay}>
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
                {kaiju.rank}
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
              const traitName = trait.value.toLowerCase();
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
                    <Typography variant="caption" align="left" style={traitStyle} className={classes.rarity}>
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
          {/* <Typography variant="body1" align="center" style={maxAffinityStyle}>
            {maxAffinityDescriptor} Affinity
          </Typography> */}
          {/* <Typography variant="body2" align="center" className={classes.section}>
            {affinityPercentage.toFixed()}% Attuned (id: {kaiju.maxAffinity})
          </Typography> */}
          <div className={classes.section}>
            {/* {hasAffinities &&
              Object.entries(affinities)
                .sort((a, b) => {
                  if (a[1] === b[1]) {
                    return affinityOccurences[a[0]] - affinityOccurences[b[0]];
                  }
                  return b[1] - a[1];
                })
                .map((entry) => {
                  const [key, value] = entry;
                  const affinity = Number(key);
                  const affinityRarity = getAffinityRarityDescriptor(ranks.getAffinityRarity(affinity));
                  const affinityColor = getRarityColor(ranks.getAffinityRarity(affinity));
                  const affinityStyle = { color: affinityColor };
                  const percentageColor = value === 5 ? '#ec3fa8' : 'inherit';
                  const percentageStyle = { color: percentageColor };
                  return (
                    <div key={`affinity-${key}`} className={classes.traitItem}>
                      <div className={classes.descriptor}>
                        <Typography variant="body2" align="left" style={percentageStyle}>
                          Affinity {key} ({affinityOccurences[key]})
                        </Typography>
                        <Typography variant="caption" align="left" style={affinityStyle}>
                          {affinityRarity}
                        </Typography>
                      </div>
                      <Typography variant="body2" align="right" style={percentageStyle}>
                        {value} / {kaiju.traitCount - 1} traits
                      </Typography>
                    </div>
                  );
                })} */}
            {/* <div className={clsx(classes.flexContainer, classes.rankContainer, classes.section)}>
              {!hasAffinities && (
                <Typography variant="body2" align="center" className={classes.section}>
                  0 notable affinities
                </Typography>
              )}
              {otherAffinities > 0 && (
                <Typography variant="body2" align="center">
                  {otherAffinities} other {otherAffinities > 1 ? 'affinities' : 'affinity'}
                </Typography>
              )}
            </div> */}
            {ranks.custom && kaiju.score && (
              <>
                <Typography variant="body1" align="center" className={classes.section}>
                  Score Breakdown
                </Typography>
                <div className={classes.traitItem}>
                  <div className={classes.descriptor}>
                    <Typography variant="body2" align="left">
                      Trait Score
                    </Typography>
                    <Typography variant="caption" align="left" className={classes.rarity}>
                      Trait Percentile
                    </Typography>
                  </div>
                  <Typography variant="h6" align="right">
                    {kaiju.score.trait.toFixed(2)}
                  </Typography>
                </div>
                <div className={classes.traitItem}>
                  <div className={classes.descriptor}>
                    <Typography variant="body2" align="left">
                      Affinity Score
                    </Typography>
                    <Typography variant="caption" align="left" className={classes.rarity}>
                      Trait Percentile
                    </Typography>
                  </div>
                  {/* <Typography variant="h6" align="right">
                    {kaiju.score.affinity.toFixed(2)}
                  </Typography> */}
                </div>
                <div className={classes.traitItem}>
                  <div className={classes.descriptor}>
                    <Typography variant="body2" align="left">
                      Name Score
                    </Typography>
                    <Typography variant="caption" align="left" className={classes.rarity}>
                      Trait Percentile
                    </Typography>
                  </div>
                  {/* <Typography variant="h6" align="right">
                    {kaiju.score.name.toFixed(2)}
                  </Typography> */}
                </div>
              </>
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
});

export default KaijuDisplay;
