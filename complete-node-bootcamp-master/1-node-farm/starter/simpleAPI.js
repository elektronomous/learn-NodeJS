// you need http to create the server
const http = require("http");
// API is to serve the client the data that they're asking
const fs = require("fs");
// to parse the URL, we need url module
const url = require("url");

const { resolveNaptr } = require("dns");

// we need the replaceProduct
const replaceProduct = require(`${__dirname}/libs/replaceProduct.js`);
// when we have something that's not valid
const redirectTo = require(`${__dirname}/libs/redirectTo.js`);

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

// create server so we can handle the client's request
const server = http.createServer((req, res) => {
  // get the client URI using URL method inside the req
  // const pathName = req.url;
  // from req.url, we can parse to get the query string
  const { query, pathname: pathName } = url.parse(req.url, true);

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
  } else if (pathName === "/product") {
    // the query product could be manually edited so we need to
    // make sure that id is correct
    isValidId = query?.id ?? null;
    // is our data on the id
    isDataExist = dataObj[query.id] ?? null;

    // if it's not valid, go back to the home page
    if (!isValidId || !isDataExist) {
      redirectTo(res);
    } else {
      res.writeHead(200, {
        "Content-type": "text/html",
      });

      const output = replaceProduct(dataObj[query.id], tempProduct);
      res.end(output);
    }
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
