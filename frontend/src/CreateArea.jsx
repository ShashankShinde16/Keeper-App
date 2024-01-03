import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';

function CreateArea(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [temp, setTemp] = useState({  title: '', note: '' });

  function handleNewContent(event) {
    const { name, value } = event.target;
    setTemp((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (temp.title !== '' || temp.note !== '') {
      setAdding(true);

      try {
        const response = await fetch('http://localhost:5000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(temp),
        });

        if (response.ok) {
          // await fetchData();
        }else{
          console.error('Failed to add note');
        }

      } catch (error) {
        console.error('Error while making API request:', error);
      }
        setAdding(false);
        setTemp({ title: '', note: '' });
    } else {
      setOpen(true);
    }
  }

  return (
    <div>
      {adding && <LinearProgress />}
      <form>
        {isExpanded && (
          <input
            onChange={handleNewContent}
            value={temp.title}
            name="title"
            placeholder="Title"
          />
        )}
        <textarea
          onClick={() => {
            setIsExpanded(true);
          }}
          onChange={handleNewContent}
          value={temp.note}
          name="note"
          placeholder="Take a note..."
          rows={isExpanded ? '3' : '1'}
        />
        <Zoom in={isExpanded}>
          <Fab className="fab" onClick={onSubmit} type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
      <Collapse in={open}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>Warning</AlertTitle>
          This is a warning alert —{' '}
          <strong>you can't leave both the fields empty!</strong>
        </Alert>
      </Collapse>
    </div>
  );
}

export default CreateArea;
