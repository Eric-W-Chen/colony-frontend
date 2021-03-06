import React, { useState } from 'react';
import { useProfileProvider } from 'contexts/profile';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { Button, Container, CssBaseline, Paper, Avatar } from '@material-ui/core';
// import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';


const useStyles2 = makeStyles(theme => ({
  table: {
    width: '100%',
    minWidth: 500,
    marginTop: 8,
  },
  paper: {
    width: '100%',
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
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


const SingleAnimal = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles2();
  const [currentAnimal, setCurrentAnimal] = useState(props.location.state.animal);
  const [redirectToAnimals, setRedirectToAnimals] = useState(false);
  const [notes, setNotes] = useState('');

  console.log('PROPS: ', props.location.state.animal);
  const onSaveNotes = (event) => {
    alert(`click works: ${notes}`);
    const myNotes = { animalId: id, notes }; // store the notes against an animal for a specific user.
    // saveNotes(myNotes);
  };

  const onNotesAdded = (event) => {
    console.log(event.target.value);
    setNotes(event.target.value);
  };


  if (redirectToAnimals) {
    return <Redirect to="/dashboard/colony" />;
  }


  return (
    <Container component="main">
      <CssBaseline />

      <div className={classes.paper}>

        <Card className={classes.root}>
          <CardMedia
            className={classes.cover}
            image="https://d17fnq9dkz9hgj.cloudfront.net/uploads/2012/11/106564123-rats-mice-care-253x169.jpg"
            title="Rat"
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>ID:</strong> {currentAnimal.mouseId}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Species:</strong> My Species
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Date of birth:</strong> {currentAnimal.dobMonth}/{currentAnimal.dobDay}/{currentAnimal.dobYear}
              </Typography>

              {
                currentAnimal.dodDay > 0 ?
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong>Date of death:</strong> {currentAnimal.dodMonth}/{currentAnimal.dodDay}/{currentAnimal.dodYear}
                  </Typography>
              : null
              }


              <Typography variant="subtitle1" color="textSecondary">
                <strong>Litter:</strong> {currentAnimal.litter}
              </Typography>
            </CardContent>

            <CardContent className={classes.content}>

              <Typography variant="subtitle1" color="textSecondary">
                <strong>Father ID:</strong> {currentAnimal.fatherId}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Mother ID:</strong> {currentAnimal.motherId}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Gene 1</strong> {currentAnimal.gene1}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Gene 2</strong> {currentAnimal.gene2}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Gene 3</strong> Y
              </Typography>

              <Typography variant="subtitle1" color="textSecondary">
                <strong>Litter:</strong> {currentAnimal.litter}
              </Typography>
            </CardContent>

            <div className={classes.controls}>
              <Button
                onClick={() => {
                setRedirectToAnimals(true);
              }}
                variant="outlined"
                color="primary"
              >Back
              </Button>
            </div>
          </div>

        </Card>

        <div className={classes.details} style={{ flexDirection: 'column' }}>
          <div>
            <TextField
              id="filled-full-width"
              label="Notes"
              placeholder="Type your notes here"
              style={{ margin: 8 }}
              className={classes.textField}
              fullWidth
              onChange={onNotesAdded}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className={classes.controls} style={{ paddingRight: 0 }}>
            <Button onClick={onSaveNotes} variant="contained" color="primary">Save</Button>
          </div>
        </div>
      </div>
    </Container >
  );
};

export default SingleAnimal;
