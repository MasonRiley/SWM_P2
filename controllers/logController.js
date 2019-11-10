exports.log = function(data) {
  const fs = require('fs');
  var stream = fs.createWriteStream('/var/log/hotburger/api.log', {flags:'a'});
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() +
    ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  stream.write(date + ': ' + data + '\n');
  stream.end();
}

exports.getTotal = (req, res) => {
  const fs = require('fs');
  var total = 0;

  //Read in log file and separate by line
  var array = fs.readFileSync('/var/log/hotburger/api.log').toString().split("\n");

  var i;
  for(i = 0; i < array.length; ++i) {
    //Now separate each line by whitespace
    var line = new Array();
    line = array[i].split(" ");

    //Search for each instance of 'ORDER' and add (price*quantity) to total
    for(j = 0; j < line.length; ++j) {
      var strComp = line[j].localeCompare("ORDER");

      if(strComp == 0) {
        ++j; //Skip the word 'ORDER'
        var price = parseInt(line[++j], 10);
        var quantity = parseInt(line[++j], 10);
        total += price * quantity;
      }
    }
  }

  res.send('Total amount of earnings thus far = ' + total);
}

exports.getTopSeller = (req, res) => {
  const fs = require('fs');
  var hotdogs = 0;
  var hamburgers = 0;
  var cookies = 0;
  var sodas = 0;

  //Read in log file and separate by line
  var array = fs.readFileSync('/var/log/hotburger/api.log').toString().split("\n");

  var i;
  for(i = 0; i < array.length; ++i) {
    //Now separate each line by whitespace
    var line = new Array();
    line = array[i].split(" ");

    //Search for each instance of 'ORDER' and add (price*quantity) to total
    for(j = 0; j < line.length; ++j) {
      var strComp = line[j].localeCompare("ORDER");

      if(strComp == 0) {
        ++j; //Skip the word 'ORDER'
        var price = parseInt(line[++j], 10);
        var quantity = parseInt(line[++j], 10);
        total += price * quantity;
      }
    }
  }


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
