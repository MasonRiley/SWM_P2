const port = 80,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  fs = require("fs");

const routeMap = {
  "/": "views/index.html"
};

const getViewURL = (url) => {
  return `views${url}.html`;
};

var access = fs.createWriteStream('/var/log/hotburger/api.log');
process.stdout.write = access.write.bind(access);

http
  .createServer((req, res) => {
    let viewURL = getViewURL(req.url);
    fs.readFile(viewURL, (error, data) => {
      if(error) {
        res.writeHead(httpStatus.NOT_FOUND);
        res.write("<h1>Welcome to Burger Place!</h1>");
      } else {
        res.writeHead(httpStatus.OK, {
          "Content-Type": "text/html"
        });
        res.write(data);
      }
      res.end();
    });
  })

  .listen(port);
  console.log(`The server has started and is listening on port number: ${port}`);
