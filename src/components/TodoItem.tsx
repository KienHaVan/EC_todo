import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useMain } from '../context/MainContext';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function TodoItem({ todo }) {
  const [isFix, setIsFix] = useState(false);
  const { name, id, done } = todo;
  const [value, setValue] = useState(name);
  const { dispatch } = useMain();
  const handleToggle = () => {
    dispatch({
      type: 'TOGGLE_DONE',
      payload: { id: id },
    });
  };
  const handleDelete = () => {
    dispatch({
      type: 'DELETE_TODO',
      payload: { id: id },
    });
  };
  const handleConfig = () => {
    setIsFix(true);
  };
  const handleSave = () => {
    dispatch({
      type: 'CONFIG_TODO',
      payload: {
        id,
        name: value,
        done,
      },
    });
    setIsFix(false);
  };
  return (
    <Paper
      elevation={2}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 500,
        height: 56,
      }}
    >
      <Checkbox checked={done} size="medium" onClick={handleToggle} />
      {!isFix && (
        <Typography
          variant="h6"
          component="p"
          sx={{ textDecoration: done ? 'line-through' : null, flex: 1 }}
        >
          {name}
        </Typography>
      )}
      {isFix && (
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={value}
          sx={{ flex: 1 }}
          onChange={(event) => setValue(event.target.value)}
        />
      )}
      {done && (
        <Button
          variant="contained"
          sx={{ bgcolor: 'red', height: 56 }}
          onClick={handleDelete}
        >
          DELETE
        </Button>
      )}
      {!done && !isFix && (
        <Button
          variant="contained"
          sx={{ bgcolor: 'blue', height: 56 }}
          onClick={handleConfig}
        >
          CONFIG
        </Button>
      )}
      {!done && isFix && (
        <Button
          variant="contained"
          sx={{ bgcolor: 'blue', height: 56 }}
          onClick={handleSave}
        >
          SAVE
        </Button>
      )}
    </Paper>
  );
}

export default TodoItem;
