//Note: I kept this file in a 'controllers' folder - figured you didn't want a
//whole directory structure submitted.

exports.log = function(data) {
  const fs = require('fs');
  var stream = fs.createWriteStream('/var/log/hotburger/api.log', {flags:'a'});
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() +
    ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  stream.write(date + ': ' + data + '\n');
  stream.end();
}

exports.printLog = (req, res) => {
  const fs = require('fs');
  var array = fs.readFileSync('/var/log/hotburger/api.log').toString().split("\n");

  var logger = require('./logController');
  logger.log(('GET for ' + req.originalUrl + ' successful.'));

  //Set up HTML
  res.write('<html>');
  res.write('<body>');
  res.write('<p>');

  //Print each log entry
  for(i in array) {
    res.write(array[i]);
    res.write('<br>');
  }

  //Finish up HTML
  res.write('</p>');
  res.write('</body>');
  res.write('</html>');
  res.end();
}
