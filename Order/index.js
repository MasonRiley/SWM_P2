const port = 80,
  express = require('express'),
  app = express(),
  logger = require('./controllers/logController'),
  menuController = require('./controllers/menuController'),
  menu = require('./views/menuView');

app.use((req, res, next) => {
   logger.log(('GET request for ' + req.originalUrl));
   next();
});

app.get('/', (req, res) => {
  res.send('Welcome to HotBurger!');
  logger.log(('GET for ' + req.originalUrl + ' successful.'));
});

app.get('/version', (req, res) => {
  res.send('This is version 1 of the HotBurger service.');
  logger.log(('GET for ' + req.originalUrl + ' successful.'));
});

app.get('/getmenu', menu.printMenu);

app.post('/purchase/:item/:quantity', (req, res) => {
  let item = req.params.item;
  let quantity = req.params.quantity;
  let price = menuController.getPrice(item);

  res.send('Successfully ordered ' + quantity + ' ' + item + '(s)');
  logger.log(`ORDER ${item} ${price} ${quantity}`);
});

app.get('*', (req, res) => {
  logger.log(('GET for ' + req.originalUrl + ' failed - does not exist.'));
  res.send('404: Page not found.');
});

app.listen(port, () => {
    logger.log(`The server has started and is listening on port number: ${port}`);
});
