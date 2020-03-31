import React, { useState } from 'react';
import { useProfileProvider } from 'contexts/profile';
import { useParams } from 'react-router-dom';
import { Button, Container, CssBaseline, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Avatar } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import IconButton from '@material-ui/core/IconButton';

const paginationStyle = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = paginationStyle();
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


const useStyles2 = makeStyles(theme => ({
  table: {
    width: '100%',
    minWidth: 500,
    marginTop: 8,
  },
  paper: {
    position: 'absolute',
    width: '60%',
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'right',
    alignContent: 'right',
    alignSelf: 'flex-end',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));


const Animals = () => {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;
  const [openModal, setOpenModal] = React.useState(false);
  const [currentAnimal, setCurrentAnimal] = useState({});
  const { state, getAnimals } = useProfileProvider();
  const { animals } = state;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, animals.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    // animals = getAnimals(rowsPerPage, newPage)
    setPage(newPage);
  };

  const handleOpenModal = (animal) => {
    setCurrentAnimal(animal);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  return (
    <Container component="main" style={{ padding: 8 }}>
      <CssBaseline />
      <h1>Colony X</h1>
      <TableContainer className={classes.table} component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
            ? animals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : animals
          ).map(animal => (
            <TableRow key={animal.mouseId}>
              <TableCell
                style={{ cursor: 'pointer' }}
                component="th"
                scope="row"
                onClick={() => {
                handleOpenModal(animal);
              }}
              >
                <div style={{ fontWeight: 'bold', fontSize: 18, flexDirection: 'row' }}>
                  <Avatar alt={animal.mouseId} />
                  <span>{animal.mouseId}</span>
                </div>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                  window.location = '/animal/animalId';
                }}
                >Details
                </Button>
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
                count={animals.length}
                rowsPerPage={10}
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

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openModal}
        onClose={handleCloseModal}
      >
        <div style={{ top: '20%', left: '20%' }} className={classes.paper}>

          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>

                <Typography variant="subtitle1" color="textSecondary">
                  <strong>ID:</strong> {currentAnimal.mouseId}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Gender:</strong> {currentAnimal.gender}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Litter:</strong> {currentAnimal.litter}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Father ID:</strong> {currentAnimal.fatherId}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Mother ID:</strong> {currentAnimal.mootherId}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>DOB Month:</strong> {currentAnimal.dobMonth}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>DOB Day:</strong> {currentAnimal.dobDay}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>DOB Year</strong> {currentAnimal.dobYear}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>DOD Month:</strong> {currentAnimal.dodMonth}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>DOD Day:</strong> {currentAnimal.dodDay}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>DOD Year</strong> {currentAnimal.dodYear}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Gene 1:</strong> {currentAnimal.gene1}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Gene 2:</strong> {currentAnimal.gene2}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Gene 3:</strong> {currentAnimal.gene3}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>TOD:</strong> {currentAnimal.tod}
                </Typography>
              </CardContent>

              <div className={classes.controls}>
                <Button variant="outlined" color="primary" onClick={handleCloseModal}>Done</Button>
              </div>
            </div>

          </Card>

        </div>
      </Modal>

    </Container >
  );
};

export default Animals;
