const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_CLUSTER, {writeConcern: { w: 'majority' }});

// Define a simple schema for notes
const noteSchema = new mongoose.Schema({
  title: String,
  note: String,
});

const Note = mongoose.model('Note', noteSchema);

// Express routes
app.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/', async (req, res) => {
  const { title, note } = req.body;
  const newNote = new Note({ title, note });

  try {
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post("/delete", async (req,res) => {
  const { title, note } = req.body;
  try {
    const notes = await Note.deleteOne({title: title, note: note});
    res.json(notes + " is deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
