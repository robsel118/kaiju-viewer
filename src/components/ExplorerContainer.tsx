import { makeStyles, useMediaQuery } from '@material-ui/core';
import { viewerTheme } from '../viewer.utils';

const useStyles = makeStyles((theme) => ({
  explorerWindow: {
    border: '12px solid #748C7B',
    background: '#FFF',
    clipPath: `polygon(0% 14px, 14px 14px, 14px 0%, calc(100% - 14px) 0%, calc(100% - 14px) 14px, 100% 14px, 100% 100%, 0 100%)`,
  },
  explorerTab: {
    background: '#748C7B',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
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
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
  explorerContent: {
    padding: theme.spacing(2),
  },
  title: {
    fontFamily: 'KaijuKingz',
    color: '#FFF',
    fontSize: '1.5rem',
    lineHeight: 1,
  },
}));

export interface ExplorerContainerProps {
  children: React.ReactNode;
  buttonLarge: number;
  buttonSmall: number;
  title?: string;
}

export default function ExplorerContainer(props: ExplorerContainerProps): JSX.Element {
  const classes = useStyles(viewerTheme);
  const isMobile = useMediaQuery(viewerTheme.breakpoints.down('sm'));

  return (
    <div className={classes.explorerWindow}>
      <div className={classes.explorerTab}>
        <div className={classes.buttonGroup}>
          {Array.from({ length: props.buttonLarge }).map((_, index) => (
            <div key={`big-${index}`} className={classes.explorerButtonLarge} />
          ))}
        </div>
        {props.title && !isMobile && <div className={classes.title}>{props.title}</div>}
        <div className={classes.buttonGroup}>
          {Array.from({ length: props.buttonSmall }).map((_, index) => (
            <div key={`big-${index}`} className={classes.explorerButtonSmall} />
          ))}
        </div>
      </div>
      <div className={classes.explorerContent}>{props.children}</div>
    </div>
  );
}
