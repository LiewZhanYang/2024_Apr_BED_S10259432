const path = require("node:path");
const notes = "/users/joe/notes.txt";

console.log(path.dirname(notes)); // prints the directory name
console.log(path.basename(notes)); // prints the filename
console.log(path.extname(notes)); // prints the file extension

const fs = require("node:fs");

fs.readFile("C:\\Users\\User\\test.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

const fs = require("node:fs");
const content = "This is the content of my file.";

// Make sure the path is correct for your system.
// This will create the file in your current user's directory.
const filePath = "C:\\Users\\User\\test.txt"; // Replace 'YourUserName' with your actual Windows username.

fs.writeFile(filePath, content, (err) => {
  if (err) {
    console.error("There was an error creating the file:", err);
  } else {
    console.log("File created successfully!");
  }
});

const chalk = require("chalk");
const log = console.log;

log(chalk.red("Welcome"));

log(chalk.green("Hello World"));
