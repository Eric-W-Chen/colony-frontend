import React, { useState } from 'react';
import { useProfileProvider } from 'contexts/profile';
import { useParams } from 'react-router-dom';
import { Button, Container, CssBaseline, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import IconButton from '@material-ui/core/IconButton';

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


// function createData(id, name, photo) {
//   return { id, name, photo };
// }

// const rows = [
//   createData(1, 'Animal A', 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
//   createData(2, 'Animal B', 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg'),
//   createData(3, 'Animal C', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/chihuahua-dog-running-across-grass-royalty-free-image-1580743445.jpg?crop=0.655xw:0.983xh;0.107xw,0&resize=640:*'),
//   createData(4, 'Animal D', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-laying-on-grass-high-res-stock-photography-1574096636.jpg?crop=0.722xw:1.00xh;0.140xw,0&resize=640:*'),
//   createData(5, 'Animal E', 'https://images.theconversation.com/files/205966/original/file-20180212-58348-7huv6f.jpeg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip'),
// ];

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
  const { animals, addColony } = useProfileProvider();
  const { id } = useParams();
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openModal, setOpenModal] = React.useState(false);
  const [currentAnimal, setCurrentAnimal] = useState({});
//   const animals = [ { mouseId: 884,
//                       gender: "F",
//                       litter: 4,
//                       fatherId: 284,
//                       motherId: 285,
//                       dobMonth: 3,
//                       dobDay: 29,
//                       dobYear: 2012,
//                       dodMonth: -1, 
//                       dodDay: -1,
//                       dodYear: -1,
//                       tod: "NA",
//                       notes: "",
//                       gene1: "+/-",
//                       gene2: "NA",
//                       gene3: "NA",
//                       photo: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
//                     },
//                     { mouseId: 884,
//                       gender: "F",
//                       litter: 4,
//                       fatherId: 284,
//                       motherId: 285,
//                       dobMonth: 3,
//                       dobDay: 29,
//                       dobYear: 2012,
//                       dodMonth: -1, 
//                       dodDay: -1,
//                       dodYear: -1,
//                       tod: "NA",
//                       notes: "",
//                       gene1: "+/-",
//                       gene2: "NA",
//                       gene3: "NA",
//                       photo: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
//                     },
//                     { mouseId: 884,
//                       gender: "F",
//                       litter: 4,
//                       fatherId: 284,
//                       motherId: 285,
//                       dobMonth: 3,
//                       dobDay: 29,
//                       dobYear: 2012,
//                       dodMonth: -1, 
//                       dodDay: -1,
//                       dodYear: -1,
//                       tod: "NA",
//                       notes: "",
//                       gene1: "+/-",
//                       gene2: "NA",
//                       gene3: "NA",
//                       photo: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
//                     },
//                     { mouseId: 884,
//                       gender: "F",
//                       litter: 4,
//                       fatherId: 284,
//                       motherId: 285,
//                       dobMonth: 3,
//                       dobDay: 29,
//                       dobYear: 2012,
//                       dodMonth: -1, 
//                       dodDay: -1,
//                       dodYear: -1,
//                       tod: "NA",
//                       notes: "",
//                       gene1: "+/-",
//                       gene2: "NA",
//                       gene3: "NA",
//                       photo: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
//                     },
// ];


  // Use the useEffect hook to get the animals using the id
  console.log('ID of the Colony', id);

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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, animals.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      <input type="file" name="file" onChange={onChangeHandler} />
      <Button onClick={onClickHandler} variant="outlined">Upload</Button>

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
                  <Avatar alt={animal.mouseId} src={animal.photo} className={classes.large} />
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
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={animals.length}
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


      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openModal}
        onClose={handleCloseModal}
      >
        <div style={{ top: '20%', left: '20%' }} className={classes.paper}>

          <Card className={classes.root}>
            <CardMedia
              className={classes.cover}
              image={currentAnimal.photo}
              title="Live from space album cover"
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>

                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Name:</strong> {currentAnimal.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>ID:</strong> {currentAnimal.id}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Species:</strong> My Species
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Date of birth:</strong> mm/dd/yyyy
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Date of death:</strong> mm/dd/yyyy
                </Typography>

                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Litter:</strong> 4
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
