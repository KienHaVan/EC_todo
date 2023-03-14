import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useMain } from '../context/MainContext';
import { v4 as uuidv4 } from 'uuid';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function Form() {
  const { input, setInput, dispatch, todos } = useMain();
  console.log('🚀 ~ file: Form.tsx:8 ~ Form ~ todos:', todos);
  console.log(dayjs());

  const handleAdd = () => {
    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: uuidv4(),
        name: input,
        done: false,
      },
    });
    setInput('');
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          position: 'relative',
        }}
        marginTop={4}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          sx={{ width: 500 }}
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        {/* <DatePicker /> */}

        {/* <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        sx={{ width: 500 }}
      /> */}
        <Button
          variant="contained"
          sx={{ bgcolor: 'red', height: 56, position: 'absolute', right: 100 }}
          onClick={handleAdd}
        >
          + Add new item
        </Button>
      </Box>
    </LocalizationProvider>
  );
}

export default Form;
