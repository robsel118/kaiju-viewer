import { List, makeStyles, TablePagination, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import KaijuDisplay from '../components/KaijuDisplay';
import KaijuListItem from '../components/KaijuListItem';
import { StoreContext } from '../store/StoreContext';
import { viewerTheme } from '../viewer.utils';

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    marginBottom: theme.spacing(1),
  },
  centerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  wizardDisplay: {
    backgroundColor: '#af8954',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  wizardList: {
    justifyContent: 'center',
  },
  list: {
    flexGrow: 2,
  },
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
}));

const KaijuList = observer(() => {
  const isMobile = useMediaQuery(viewerTheme.breakpoints.down('sm'));
  const store = useContext(StoreContext);
  const classes = useStyles(viewerTheme);
  const { ranks } = store;

  // pagination variables
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const start = page * pageSize;
  const end = (page + 1) * pageSize;

  useEffect(() => {
    setPage(0);
  }, [ranks.showUser, ranks.filter]);

  return (
    <div className={classes.itemContainer}>
      <div className={classes.flexContainer}>
        <div className={classes.explorerWindow}>
          <div className={classes.explorerTab}>
            <div className={classes.buttonGroup}>
              <div className={classes.explorerButtonLarge} />
              <div className={classes.explorerButtonLarge} />
            </div>
            <div className={classes.buttonGroup}>
              <div className={classes.explorerButtonSmall} />
              <div className={classes.explorerButtonSmall} />
            </div>
          </div>
          <div className={classes.explorerContent}>
            <List dense className={classes.list}>
              {ranks.display.slice(start, end).map((kaiju) => (
                <KaijuListItem key={kaiju.tokenId} kaiju={kaiju} />
              ))}
            </List>
            <div className={clsx(classes.itemContainer, classes.centerContainer)}>
              <TablePagination
                labelRowsPerPage={isMobile ? 'Rows:' : 'Rows per page:'}
                component="div"
                count={ranks.display.length}
                page={page}
                rowsPerPage={pageSize}
                rowsPerPageOptions={[12, 25]}
                onChangePage={(_e, page) => setPage(page)}
                onChangeRowsPerPage={(e) => setPageSize(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className={classes.explorerWindow}>
          <div className={classes.explorerTab}>
            <div className={classes.buttonGroup}>
              <div className={classes.explorerButtonLarge} />
            </div>
            <div className={classes.buttonGroup}>
              <div className={classes.explorerButtonSmall} />
              <div className={classes.explorerButtonSmall} />
            </div>
          </div>
          <div className={classes.explorerContent}>{!isMobile && <KaijuDisplay />}</div>
        </div>
      </div>
    </div>
  );
});

export default KaijuList;
