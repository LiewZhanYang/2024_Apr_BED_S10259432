async function fetchBooks() {
  const response = await fetch("/books"); // Replace with your API endpoint
  const data = await response.json();

  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  data.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book"); // Add a CSS class for styling

    // Create elements for title, author, etc. and populate with book data
    const titleElement = document.createElement("h2");
    titleElement.textContent = book.title;

    const authorElement = document.createElement("p");
    authorElement.textContent = `By: ${book.author}`;

    // ... add more elements for other book data (optional)

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-book");
    deleteButton.dataset.id = book.id;

    bookItem.appendChild(titleElement);
    bookItem.appendChild(authorElement);
    bookItem.appendChild(deleteButton);
    // ... append other elements

    bookList.appendChild(bookItem);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const createBookForm = document.getElementById("create-book-form");

  // Fetch and display books on initial load
  fetchBooks();

  // Handle form submission for creating a new book
  createBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    const response = await fetch("/books", {
      // Replace with your API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author }),
    });

    if (response.ok) {
      fetchBooks(); // Refresh the book list
      createBookForm.reset();
    } else {
      console.error("Failed to create book");
    }
  });

  // Handle delete book
  document
    .getElementById("book-list")
    .addEventListener("click", async (event) => {
      if (event.target.classList.contains("delete-book")) {
        const bookId = event.target.dataset.id;
        const response = await fetch(`/books/${bookId}`, {
          // Replace with your API endpoint
          method: "DELETE",
        });

        if (response.ok) {
          fetchBooks(); // Refresh the book list
        } else {
          console.error("Failed to delete book");
        }
      }
    });
});
