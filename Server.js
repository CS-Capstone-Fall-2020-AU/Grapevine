const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql",
  database: "grapevinedatabase"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors());
//----------------------------------------------------------------GET---------------------------------------------------------------------------

app.get('/', (req, res) => {
  res.send("Get command connected");
})

app.get('/companies', (req, res) => {
	con.query('SELECT * FROM `companies`', (err, results) => {
	  if (err) {
		return res.send(error);
	  }
	  else {
		return res.json({
		  data: results
		})
	  }
	});
  })
  
  
  app.get('/users', (req, res) => {
	con.query('SELECT * FROM `users`', (err, results) => {
	  if (err) {
		return res.send(error);
	  }
	  else {
		return res.json({
		  data: results
		})
	  }
	});
  })

  app.get('/reviews', (req, res) => {
	con.query('SELECT * FROM `spectraldistributionfields`', (err, results) => {
	  if (err) {
		return res.send(error);
	  }
	  else {
		return res.json({
		  data: results
		})
	  }
	});
  })


//----------------------------------------------------------------POST---------------------------------------------------------------------------
app.post('/companies', (req, result) => {
  result.set('Access-Control-Allow-Origin', '*');
  const body = (req.body);
  var practice = 'INSERT INTO `companies`(`companyName`, `numOfRatings`, `overallRatingGrade`, `imgLogoUrl`) VALUES ("' + body.companyName + '", "' + body.numOfRatings + '", "' + body.overallRatingGrade + '", "' + body.imageLogoUrl + '")'
  con.query(practice, function (err, result) {
    if (err) throw err;
    console.log("inserted " + result);
  });
  result.send({ message: 'Success' })
});


app.post('/users', (req, result) => {
  result.set('Access-Control-Allow-Origin', '*');
  console.log("this?", typeof (req), "and", typeof (req.body));
  const body = (req.body);
  var practice2 = 'INSERT INTO `users`(`userID`, `isAnonymous`, `firstName`, `lastName`, `username`, `password`, `email`) VALUES ("' + body.userID + '", "' + body.isAnonymous + '",  "' + body.firstName + '",  "' + body.lastName + '",  "' + body.username + '",  "' + body.password + '", "' + body.email + '")'
  con.query(practice2, function (err, result) {
    if (err) throw err;
      console.log("Inserted " + result);
  });
  result.send({ message: 'Success' })
});



app.post('/reviews', (req, result) => {
  result.set('Access-Control-Allow-Origin', '*');
  console.log("this?", typeof (req), "and", typeof (req.body));
  const body = (req.body);

  var practice3 = 'INSERT INTO `reviews`(`reviewID`, `userID`, `internshipRating`, `role`, `companyName`, `comments`, `agreeVotes`, `location`) VALUES ("' + body.reviewID + '", "' + body.userID + '", "' + body.internshipRating + '", "' + body.role + '", "' + body.companyName + '", "' + body.comments + '", "' + body.agreeVotes + '", "' + body.location + '")'
  con.query(practice3, function (err, result) {
    if (err) throw err;
    console.log("Inserted review " + result);
  });
  result.send({ message: 'Success' })
});



app.listen(4000, () => {
  console.log("Listening to grapevine server on port 4000");
})



