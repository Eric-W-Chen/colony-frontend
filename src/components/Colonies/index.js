import React, { useState } from 'react';
import { useProfileProvider } from 'contexts/profile';
import { Button, Container, CssBaseline, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import Share from '@material-ui/icons/Share';
import { Redirect } from 'react-router-dom';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const {
    count, page, rowsPerPage, onChangePage,
  } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      />
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page" />
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      />
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      />
    </div>
  );
}

const useStyles2 = makeStyles({
  table: {
    width: '100%',
    minWidth: 500,
    marginTop: 8,
  },
});

const Colonies = () => {
  const { state: { ownedColonies } } = useProfileProvider();
  const { addColony, getAnimals } = useProfileProvider();

  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [redirectToAnimals, setRedirectToAnimals] = useState(false);


  /* Uploading File. */
  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0].name);
    setFileName(event.target.files[0].name);
  };

  const onClickHandler = async () => {
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = async () => {
      const load = reader.result;
      const data = { payload: load, name: fileName };
      await addColony(data);
    };

    reader.onerror = () => {
      console.log(reader.onerror);
    };
  };

  /* Pagination handler */
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, ownedColonies.length - page * rowsPerPage);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCellClick = (uuid, rowsPerPage, page) => {
      const request = { colonyId: uuid, rowsPerPage, page };
      getAnimals(request);

      setRedirectToAnimals(true);
  }

  if (redirectToAnimals) {
    return <Redirect to="/dashboard/colony"/>;
  }

  return (
    <Container component="main">
      <CssBaseline />
      <input type="file" name="file" onChange={onChangeHandler} />
      <Button onClick={onClickHandler} variant="outlined" color="default" startIcon={<CloudUploadIcon />}>Upload</Button>

      <TableContainer className={classes.table} component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? ownedColonies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : ownedColonies
            ).map(ownedColony => (
              <TableRow key={ownedColony.colonyId}>
                <TableCell
                  style={{ cursor: 'pointer' }}
                  component="th"
                  scope="row"
                  onClick={() => handleCellClick(ownedColony.colonyId, rowsPerPage, page)}
                >
                  <div style={{ fontWeight: 'bold', fontSize: 18 }}>{ownedColony.colonyName}</div>
                  <p style={{ color: '#333333' }}>Size: {ownedColony.size}</p>
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" startIcon={<Share />}>Share</Button>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={ownedColonies.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

    </Container >
  );
};

export default Colonies;
