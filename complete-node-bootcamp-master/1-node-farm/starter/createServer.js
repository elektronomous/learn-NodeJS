const http = require("http");
// we're going to create simple API
const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// set how the server receive the request and
// sending the response
const server = http.createServer((req, res) => {
  // create a simple routing
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is PRODUCT");
  } else if (pathName === "/api") {
    // // __dirname will always translate to directory in which this script is reside
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   let productData = JSON.parse(data);
    //   res.writeHead(200, {
    //     "Content-type": "application/json",
    //   });
    res.writeHead(200, {
      "Content-type": "application/json",
    });

    res.end(data);
    console.log(dataObj);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html", // expect the browser to receive html file
      "custom-header": "Hello world",
    });
    res.end("<h1>Page not found!</h1>");

    // NOTE: you send the status code first then the response
  }
});

// and then listen to the incoming request
server.listen(8008, "localhost", () => {
  console.log("Listening to the request on port 8008");
});
