const http = require("http");

// set how the server receive the request and
// sending the response
const server = http.createServer((req, res) => {
  // create a simple routing
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is PRODUCT");
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
