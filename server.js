// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
const port = 3000;

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

app.get("/api", function (req, res) {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  });
});

app.get("/api/:time", function (req, res) {
  const time = req.params.time;
  const unix = new Date(time).getTime();
  const utc = new Date(parseInt(unix)).toUTCString();
  
  if(new Date(parseInt(time)).toString() === "Invalid Date"){
    res.status(500).json({
      error: "Invalid Date"
    });
    return;
  }
  
  if(!unix){
    const unix = parseInt(time);
    const utc = new Date(parseInt(unix)).toUTCString();
    res.status(200).json({
      unix: unix,
      utc: utc
    })
  }else{
    res.status(200).json({
      unix: unix,
      utc: utc,
    })
  }
  
});


// listen for requests :)
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
