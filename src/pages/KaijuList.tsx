import { List, makeStyles, TablePagination, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import ExplorerContainer from '../components/ExplorerContainer';
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
  kaijuDisplay: {
    backgroundColor: '#af8954',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  kaijuList: {
    justifyContent: 'center',
  },
  list: {
    flexGrow: 2,
  },
  color: {
    color: '#000',
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
        <ExplorerContainer buttonLarge={2} buttonSmall={2} title="experiments">
          <List dense className={classes.list}>
            {ranks.display.slice(start, end).map((kaiju) => (
              <KaijuListItem key={kaiju.tokenId} kaiju={kaiju} />
            ))}
          </List>
          <div className={clsx(classes.itemContainer, classes.centerContainer)}>
            <TablePagination
              labelRowsPerPage={isMobile ? 'Rows:' : 'Rows per page:'}
              classes={{
                root: classes.color,
              }}
              component="div"
              count={ranks.display.length}
              page={page}
              rowsPerPage={pageSize}
              rowsPerPageOptions={[12, 25]}
              onChangePage={(_e, page) => setPage(page)}
              onChangeRowsPerPage={(e) => setPageSize(Number(e.target.value))}
            />
          </div>
        </ExplorerContainer>
        {!isMobile && (
          <ExplorerContainer buttonSmall={2} buttonLarge={1}>
            <KaijuDisplay />
          </ExplorerContainer>
        )}
      </div>
    </div>
  );
});

export default KaijuList;
