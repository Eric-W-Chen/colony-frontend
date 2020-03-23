import React, { useState } from 'react';
import { useProfileProvider } from 'contexts/profile';
import { Button, Container, CssBaseline, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const Colonies = () => {
  const { addColony } = useProfileProvider();
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  
  const onChangeHandler = event => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0].name);
    setFileName(event.target.files[0].name);
  }

  const onClickHandler = async () => {
    var reader = new FileReader();

    reader.readAsText(file);

    reader.onload = async () => {
      const load = reader.result;
      const data = { payload: load, name: fileName };
      await addColony(data);
    }

    reader.onerror = () => {
      console.log(reader.onerror);
    }

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <input type="file" name="file" onChange={ onChangeHandler } />
      <Button onClick={ onClickHandler } variant="outlined">Upload</Button>
    </Container >
  );
};

export default Colonies;
