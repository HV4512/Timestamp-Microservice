// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req, res) => {
  let unixTimestamp = Date.now();
  console.log(Date.now());
  let date = new Date(unixTimestamp).toUTCString();
  console.log(date);
  res.json({ unix: unixTimestamp, utc: date });
});

app.get("/api/:time", (req, res) => {
  const Time = req.params.time;
  let unixTimestamp;
  if (Time.length < 10 && Time.length > 0) {
    res.json({ error: "Invalid Date" });
  }
  if (Time.length === 10) {
    unixTimestamp = Date.parse(Time);
  }
  else {
    unixTimestamp = parseInt(Time);
  }
  console.log(unixTimestamp);
  let date = new Date(unixTimestamp).toUTCString();
  console.log(date);
  res.json({ unix: unixTimestamp, utc: date });

});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
port = 5005;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
