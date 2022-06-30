import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import listEndpoints from "express-list-endpoints";

import data from './Data/Books.json'

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/Nexer-case";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


const Book = mongoose.model("Book", {
  "title": String,
  "author": String
})

if (process.env.RESET_DB === 'true') {
  const seedDatabase = async () => {
    await Book.deleteMany({})

    data.forEach((item) => {
      const newBook = new Book(item)
      newBook.save()
    })
  }
  seedDatabase()
}


// ERROR HANDLING:
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1 ) { // 1 då restrande inte är connected. 1 = connected
    next() // Hanterar funktionen nedan, alltså när allt fungerar som vanligt
  } else {
    res.status(503).json({error: 'Service unavilable'})
  }
})

// Routes
app.get("/", (req, res) => {
  res.send(
    {"Welcome":"Nexer case by Linnea Frisk",
      "Endpoints": "/endpoints"}
  )
});

app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app));
})

// Get all Books
app.get('/books', async (req, res) => {
  const allBooks = await Book.find()
  res.json(allBooks)
})

// Get book by title
app.get('/books/:title', async (req, res) => {
  try {
    const bookTitle = await Book.findOne({ title: req.params.title})
    if (bookTitle.length === 0) {
      res.status(404).json({error: 'Title not found'})
    } else {
      res.json(bookTitle)
    }
  } catch (err) {
    res.status(400).json({ error: 'Invalid Title'})
  }
})

// Get book by author
app.get('/books/:author', async (req, res) => {
  try {
    const bookAuthor = await Book.find({ author: req.params.author})
    if (bookAuthor.length === 0) {
      res.status(404).json({error: 'Author not found'})
    } else {
      res.json(bookAuthor)
    }
  } catch (err) {
    res.status(400).json({ error: 'Invalid Author'})
  }
})

// Create book
app.post('/add', async (req, res) => {
  try {
    const { title, author } = req.body
    const add = new Book({ title, author })
    await add.save()
    res.json(add)
  } catch (err) {
    res.status(400).json({message: 'Could not save book', errors: err.errors})
  }
})

// Delete book
app.delete('/books/:title/delete', async (req, res) => {
  try {
    const { title } = req.body
    const deleteBook = await Book.findOneAndDelete({title})
    res.json(deleteBook)
  } catch (err) {
    res.status(400).json({message: 'Could not delete book', errors: err.errors})
  }

})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
