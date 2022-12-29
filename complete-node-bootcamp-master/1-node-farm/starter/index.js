// using fs module to open-read-write to filesystem
const fs = require('fs');

// reading a file
// we use utf-8 because we use english
// store it to a variable
const textInput = fs.readFileSync('txt/read-this.txt', 'utf-8');
console.log(textInput);

// first we create a variable
const textOutput = `this is what we know about the avocado: ${textInput}.\nCreated on ${Date()}`;
// and then write to a file
fs.writeFileSync('txt/output.txt', textOutput);
