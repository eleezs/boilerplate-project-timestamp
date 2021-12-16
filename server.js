// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
let moment = require('moment');
//to parse use data
app.use(bodyParser.urlencoded({ extended: false }))


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { json } = require('body-parser');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//to get param from user url

app.get("/api/:date", (req, res) => {
  let date;
  if(/^\d+$/.test(req.params.date)){
    date = new Date(Number.parseInt(req.params.date));
  }else{
    date = new Date(req.params.date);
  }
  if (date.toString() !== 'Invalid Date') {
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  } else {
    res.json({error: date.toString()});
  }
});

app.get("/api", (req, res) => {
  const today  = new Date();
  res.json({
    unix: today.getTime(),
    utc: today.toUTCString(),
  })
});




// app.get('/api/:date?', (req, res) => {
//   let newDate = new Date(req.params.date)
//   let date;

//   if(/\D/.test(req.params.date)) {
//     date = new Date(req.params.date);
//     res.json ({
//       "unix" : new Date(date).getTime(), "utc" : new Date(date).toUTCString()
//     });
//   }else {
//     date = new Date(Number.parseInt(req.params.date))
//     res.json ({
//       "unix" : date.getTime(), "utc" : new Date(date).toUTCString()
//     });
//   };

//   // if (newDate.toString() !== undefined) {
//   //   res.json({"unix": new Date().getTime(), "utc": new Date().toUTCString()});
//   // } else {
//   //   res.json({"error": 'Invalid Date'});
//   // }

  
// });

// app.get("/api", (req, res) => {
//   const now  = new Date();
//   res.json({
//     unix: now.getTime(),
//     utc: now.toUTCString(),
//   })
// });
// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
