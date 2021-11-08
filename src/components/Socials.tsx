import { IconButton, makeStyles } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import Twitter from '@material-ui/icons/Twitter';

const useStlyes = makeStyles(() => ({
  icon: {
    height: '33px',
    width: '33px',
  },
  githubIcon: {
    height: '26px',
    width: '26px',
  },
  baseContainer: {
    alignItems: 'center',
    display: 'flex',
  },
}));

export default function Socials(): JSX.Element {
  const classes = useStlyes();
  return (
    <div className={classes.baseContainer}>
      <IconButton onClick={() => window.open('https://twitter.com/KaijuKingz', '_blank')}>
        <Twitter className={classes.icon} />
      </IconButton>
      <IconButton color="primary" onClick={() => window.open('https://discord.com/invite/kaiju-kingz', '_blank')}>
        <img src={'./assets/discord.svg'} className={classes.icon} />
      </IconButton>
      <IconButton color="primary" onClick={() => window.open('https://opensea.io/collection/kaiju-kingz', '_blank')}>
        <img src={'./assets/opensea.svg'} className={classes.icon} />
      </IconButton>
      <IconButton onClick={() => window.open('https://github.com/robsel118/kaiju-viewer', '_blank')}>
        <GitHubIcon className={classes.githubIcon} />
      </IconButton>
    </div>
  );
}
