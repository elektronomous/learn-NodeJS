const http = require("http");

// set how the server receive the request and
// sending the response
const server = http.createServer((req, res) => {
  res.end("Hello from the server");
});

// and then listen to the incoming request
server.listen(8008, "localhost", () => {
  console.log("Listening to the request on port 8008");
});
