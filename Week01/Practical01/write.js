const fs = require('node:fs');
const content = 'This is the content of my file.';

// Make sure the path is correct for your system.
// This will create the file in your current user's directory.
const filePath = 'C:\\Users\\User\\test.txt'; // Replace 'YourUserName' with your actual Windows username.

fs.writeFile(filePath, content, (err) => {
  if (err) {
    console.error('There was an error creating the file:', err);
  } else {
    console.log('File created successfully!');
  }
});
