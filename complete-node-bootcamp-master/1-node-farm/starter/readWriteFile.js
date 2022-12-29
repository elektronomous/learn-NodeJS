// using fs module to open-read-write to filesystem
const fs = require("fs");

// Blocking, Synchronous way
// reading a file
// we use utf-8 because we use english
// store it to a variable
const textInput = fs.readFileSync("txt/read-this.txt", "utf-8");
console.log(textInput);

// first we create a variable
const textOutput = `this is what we know about the avocado: ${textInput}.\nCreated on ${Date()}`;
// and then write to a file
fs.writeFileSync("txt/output.txt", textOutput);

// Non-blocking, asynchronous way
// reading a file
// if you dont' specify the utf-8, the function will
// give you a raw data.
fs.readFile("txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
});

// welcome to callback HELL
// the next readFile will depend on the previous readFile result
fs.readFile("txt/start.txt", "utf-8", (err, data1) => {
  // if encounter an error
  if (err) {
    console.log("Error, check your file");
    return;
  }
  fs.readFile(`txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);
      // now you can write the data to a final.txt
      fs.writeFile("txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("You've been write to the file");
      });
    });
  });
});

console.log("Hello");
