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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

