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
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;

  const bookIndex = books.findIndex((book) => book.Id == bookId);

  if (bookIndex !== -1) {
    updatedBook.id = bookId;
    books[bookIndex] = updatedBook;
    res.json(updatedBook);
  } else {
    res.status(404).send("Book not found");
  }
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
