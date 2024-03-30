const fs = require('fs');

const filePath = 'example.txt';
const fileContent = 'This is the content of the text file.';

fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
        console.error('An error occurred while writing to the file:', err);
    } else {
        console.log('File has been successfully written:', filePath);
    }
});