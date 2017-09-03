// server.js
// where your node app starts

// init project
const express = require('express');
const moment = require('moment');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

const natToUnix = (date) => moment(date, "MMMM D, YYYY").format("X");
    
const unixToNat = (unix) => moment.unix(unix).format("MMMM D, YYYY");

const isValid = (dateString) => {
    const minDate = new Date('1970-01-01 00:00:01');
    const maxDate = new Date('2038-01-19 03:14:07');
    const date = new Date(dateString);
    return date > minDate && date < maxDate;
}

app.get("/:timestamp", function (request, response) {
  const timeStamp = request.params.timestamp;
  let unixTime = null, normalTime = null;
  let result = {
    "unix": unixTime,
    "natural": normalTime
  };
  if (+timeStamp >= 0) {
      unixTime = +timeStamp;
      normalTime = unixToNat(unixTime);
  } 

  // Check for initial normalTime time
  if (isNaN(+timeStamp) && moment(timeStamp, "MMMM D, YYYY").isValid() && isValid(timeStamp)) {
      unixTime = +natToUnix(timeStamp);
      normalTime = unixToNat(unixTime);
  }
  result.unix = unixTime;
  result.natural = normalTime;
  response.send(result);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
