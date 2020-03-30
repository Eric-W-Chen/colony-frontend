import React, { useState } from 'react';
import { useProfileProvider } from 'contexts/profile';
import { Redirect } from 'react-router-dom';

import { Button, TextField, Container, CssBaseline, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Share from '@material-ui/icons/Share';

const paginationStyle = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = paginationStyle();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

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
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const tableStyle = makeStyles({
  table: {
    width: '100%',
    minWidth: 500,
    marginTop: 8,
  },
});

const Colonies = () => {
  const { state, state: { ownedColonies } } = useProfileProvider();
  const { addColony, getAnimals } = useProfileProvider();
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const classes = tableStyle();
  const [page, setPage] = React.useState(0);
  const [upload, setUpload] = React.useState(false);
  const rowsPerPage = 10;

  const [redirectToAnimals, setRedirectToAnimals] = useState(false);


  /* Uploading File. */
  const chooseFile = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = async () => {
      const load = reader.result;
      const data = { payload: load, name: fileName };
      await addColony(data);
      setUpload(true);
    };

    reader.onerror = () => {
      console.log(reader.onerror);
    };
  };

  /**
 * Updates input for file name.
 * 
 * @param name
 * @param value
 */
  const updateInput = ({ target: { value } }) => {
    setFileName(value);
  };

  /* Pagination handler */
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, ownedColonies.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCellClick = (uuid, rowsPerPage, page) => {
    const request = { colonyId: uuid, rowsPerPage, page };
    getAnimals(request);
    console.log(state);
    setRedirectToAnimals(true);
  }


  if (redirectToAnimals) {
    return <Redirect to="/dashboard/colony" />;
  }

  return (
    <Container component="main">
      <CssBaseline />
      <div className="uploadFile">
        <input type="file" name="file" onChange={chooseFile} />
        <div>
          <TextField variant="outlined" margin="dense" size="small" name="colonyName" label="Colony Name" onChange={updateInput} />
        </div>
        <Button onClick={uploadFile} variant="outlined" color="default" startIcon={<CloudUploadIcon />}>Upload</Button>
      </div>
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
                rowsPerPageOptions={[]}
                colSpan={3}
                count={ownedColonies.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

    </Container >
  );
};

export default Colonies;
