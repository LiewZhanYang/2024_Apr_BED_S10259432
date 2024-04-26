const express = require("express");
const app = express();

const port = 3000;

let books = [
  { id: 1, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
  { id: 2, title: "Pride and Prejudice", author: "Jane Austen" },
];

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id); // Get book ID from URL parameter
  const updatedBook = req.body; // Get updated book data from request body

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    updatedBook.id = bookId;
    books[bookIndex] = updatedBook; // Update book data in the array
    res.json(updatedBook); // Send updated book data
  } else {
    res.status(404).send("Book not found"); // Send error for non-existent book
  }
});

app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id == bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(200).send();
  } else {
    res.status(404).send("Book not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
