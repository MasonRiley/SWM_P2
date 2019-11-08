const express = require('express'),
      router = express.Router(),
      logger = require('./controllers/logController');

router.get('/logs', logger.printLogs);

router.get('/gettotal', logger.getTotal);

router.get('/gettopseller', logger.getTopSeller);

router.get('/getrequestcount', logger.getRequestCount);

router.get('/getlastrequeststatus', logger.getLastRequestStatus);

router.get('/getlastrequesttime', logger.getLastRequestTime);

router.get('*', (req, res) => {
  res.send('404: Page not found.');
});

module.exports = router;
