import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Form from './components/Form';
import BasicTabs from './components/Tabs';
import { MainProvider } from './context/MainContext';

function App() {
  return (
    <MainProvider>
      <Container sx={{ marginY: 5 }}>
        <Typography variant="h4" component="h3" sx={{ textAlign: 'center' }}>
          Todo App
        </Typography>
        <Form />
        <BasicTabs />
      </Container>
    </MainProvider>
  );
}

export default App;
