import Header from './header'
import Footer from './footer'
import Note from './note'
import CreateArea from './CreateArea'
import { useState, useEffect } from 'react'
import { Notes } from '@mui/icons-material'

function App() {
  const [notes, setNotes] = useState([]);
  // function addNotes(content) {
  //   setNotes((prev) => {
  //     return [...prev, content]
  //   })
  // }

useEffect(() => {
    // Fetch data from the server when the component mounts
    async function fetchData() {
      try {
        const response = await fetch('https://keeper-app-backend-ai76.onrender.com/');
        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        } else {
          console.error('Failed to fetch notes');
        }
      } catch (error) {
        console.error('Error while making API request:', error);
      }
    }

    fetchData();
  }, [notes]); 

  async function onDelete(title,note) {
    // setNotes(prev => {
    //   return prev.filter((item, index) => {
    //     return index !== id;
    //   })
    // })
    try {
      const response = await fetch('https://keeper-app-backend-ai76.onrender.com/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title,note}),
      });

      if (response.ok) {
        // await fetchData; 
      }else{
        console.error('Failed to add note');
      }

    } catch (error) {
      console.error('Error while making API request:', error);
    }

  }

  return (
    <>
    <Header />
    <CreateArea />
    {notes.map((ele,index) => {
      return(
        <Note 
        key={index}
        id={index}
        onDelete={onDelete}
        title={ele.title} 
        note={ele.note}
        />
      )
    })}
    <Footer />
    </>
  )
}

export default App
