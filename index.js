// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
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



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



const getDateData = (dateObj) => {
  return {
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  }
}

app.get('/api/', (req, res) => {
  // Handle the case where no date is provided
  res.status(200).json(getDateData(new Date()));
});
app.get('/api/:date' , (req , res) => {
  try {
    const {date} = req.params;
    let dateObj;

      // check if the date value is a number ;
      const dateNumber = new Number(date);
      // if it is a number use number if not use string
      const dateToUse = isNaN(dateNumber) ? date : dateNumber 
      // create a new date object
      dateObj = new Date(dateToUse);

      if(isNaN(dateObj)){
        return res.status(500).json({ error : "Invalid Date" })
      }
      else {
        res.status(200).json(getDateData(dateObj))
    
      }

  }catch(err){
    res.status(500).json({ error : err })
  }
})