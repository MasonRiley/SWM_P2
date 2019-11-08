const port = 80,
  express = require('express'),
  app = express(),
  logger = require('./controllers/logController');

  app.use((req, res, next) => {
     logger.log(('GET request for ' + req.originalUrl));
     next();
  });

app.get('/logs', logger.printLog());

app.listen(port, () => {
    logger.log(`The server has started and is listening on port number: ${port}`);
});
