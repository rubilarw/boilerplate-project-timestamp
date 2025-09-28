// where your node app starts

// init project
var express = require('express');
var cors = require('cors');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// static files
app.use(express.static('public'));

// root route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// hello endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// 🕒 Timestamp Microservice endpoint
app.get("/api/:date?", function (req, res) {
  const { date } = req.params;
  let parsedDate;

  if (!date) {
    parsedDate = new Date();
  } else if (!isNaN(date)) {
    parsedDate = new Date(parseInt(date));
  } else {
    parsedDate = new Date(date);
  }

  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Listen on port set in environment variable or default to 5000, bind to 0.0.0.0 for Replit
var listener = app.listen(process.env.PORT || 5000, '0.0.0.0', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
