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
  }
});

// and then listen to the incoming request
server.listen(8008, "localhost", () => {
  console.log("Listening to the request on port 8008");
});
