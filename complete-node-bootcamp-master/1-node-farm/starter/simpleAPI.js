// you need http to create the server
const http = require("http");
// API is to serve the client the data that they're asking
const fs = require("fs");
const { resolveNaptr } = require("dns");

// we first need to read the html where we show our default interface to the client
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

// on our backend, we have data that could be client request
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

const replaceProduct = (data, productHTML) => {
  // ID
  const output = productHTML.replace(/{%ID%}/g, data.id);
  // replace image first
  output.replace(/{%IMAGE%}/g, data.image);
  // then product name
  output.replace(/{%PRODUCTNAME%}/g, data.productName);
  // country
  output.replace(/{%FROM%}/g, data.from);
  // price
  output.replace(/{%PRICE%}/g, data.price);
  // quantity
  output.replace(/{%QUANTITY%}/g, data.quantity);
  // nutrients
  output.replace(/{%NUTRIENTS%}/g, data.nutrients);
  // organic
  if (!data.organic) output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

// create server so we can handle the client's request
const server = http.createServer((req, res) => {
  // get the client URI using URL method inside the req
  const pathName = req.url;

  // using this URI, we could show what client want to request
  if (pathName === "/" || pathName === "/overview") {
    // send the response header first
    res.writeHead(200, {
      // remember we're going to sending an HTML file to a client, so we use
      "Content-type": "text/html",
    });

    // then we're sending the HTML response
    const cardsHTML = dataObj.map((el) => replaceProduct(el, tempCard));
    overview = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHTML);
    // console.log(...cardsHTML);
    res.end(overview);
  } else if (pathName === "/api") {
    res.end("API");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });

    res.end("<h1>Page Not Found!</h1>");
  }
});

// now listen to the port we specified to accept the client request
server.listen(8008, "localhost", () => {
  // tell the user that the server is ready
  console.log("The server is listening on port 8008");
});
