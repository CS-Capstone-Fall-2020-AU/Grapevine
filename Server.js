
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
app.use(bodyParser.json());
const spawn = require("child_process").spawn;

let reviewTestCount = 0;
// let testAccount = await nodemailer.createTestAccount();
app.post('/email', (req, res) => {
  const body = (req.body);
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: 'grapevine.internships@gmail.com', // generated ethereal user
      pass: 'grapevinepassword', // generated ethereal password
    },
  });
  let info = ({
    from: '"Grapevine 🍇" <grapevine.internships@gmail.com>', // sender address
    to: body.email, // list of receivers
    bcc: "grapevine.internships@gmail.com",
    subject: "Welcome to Grapevine!", // Subject line
    // plain text body
    html: "<b>Hi " + body.username + ", you're now hearing about internships through grapevine!</b><p>You've successfully signed up for an account on grapevine! We are excited for you to hear about your next internship through grapevine! If you did not sign up for an account, please reply 'stop' to this message, and your account will be deactivated. <br/> <br /> Thanks for being a member of our community! <br /> <br /> -Grapevine_Support</p>", // html body
  });

  transporter.sendMail(info, function (err, data) {
    if (!err) res.send('Sending OK');
    console.log(err);
    console.log(data);
  })
});

//email process^^--------------------------------------------------------------------------------------------------------------------
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
  con.query('SELECT * FROM `companies` order by `companyName`', (err, results) => {
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
/*   var childProcess = require("child_process").spawn('python', ["backend/api/reset_test.py"], { stdio: "inherit" })
   childProcess.on('data', function (data) {
     process.stdout.write("python script output", data);
   });
   childProcess.on('close', function (code) {
     if (code === 1) {
       process.stderr.write("error occured", code);
       process.exit(1);
     }
     else {
       process.stdout.write('"python script successfully exist with code: ' + code + '\n');
     }
   }); */
   //---------------------------------------------------------------------------------------
  con.query('SELECT * FROM `reviews` where `flag`!=1', (err, results) => {
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
 
  const body = (req.body); 
  if (body.anonCode && body.anonCode==='goingdark'){
    var practice2 = 'INSERT INTO `users`(`userID`, `isAnonymous`) VALUES ("' + body.userID + '", "' + body.isAnonymous + '")'

  }
  else{
    var practice2 = 'INSERT INTO `users`(`userID`, `isAnonymous`, `firstName`, `lastName`, `username`, `password`, `email`) VALUES ("' + body.userID + '", "' + body.isAnonymous + '",  "' + body.firstName + '",  "' + body.lastName + '",  "' + body.username + '",  "' + body.password + '", "' + body.email + '")'
  }
    con.query(practice2, function (err, result) {
    if (err) throw err;
    console.log("Inserted " + result);
  });
  result.send({ message: 'Success' })
});



app.post('/reviews', (req, result) => {
  result.set('Access-Control-Allow-Origin', '*');

  const body = (req.body);
  var practice3 = 'INSERT INTO `reviews`(`userID`, `internshipRating`, `role`, `companyName`, `comments`, `location`, `isAnonymous`, `username`) VALUES ("' + body.userID + '", "' + body.internshipRating + '", "' + body.role + '", "' + body.companyName + '", "' + body.comments + '", "' + body.location + '", "' + body.isAnonymous + '", "' + body.username + '")'
  con.query(practice3, function (err, result) {
    if (err) throw err;
    console.log("Inserted review " + result);
  });
  result.send({ message: 'Success' })
});

//update agree votes
app.put('/reviews', function (req, res) {
  const body = (req.body);
  res.set('Access-Control-Allow-Origin', '*');
  var putStatement = 'UPDATE `reviews` SET `agreeVotes` = `agreeVotes`+1 WHERE `reviewID` = ("' + body.agreeVotesID + '")'
  con.query(putStatement, function (err, res) {
    if (err) throw err;
    console.log("updated agree votes");
  })
  res.send('PUT Request');
});

app.put('/companies', function (req, res) {
  const body = (req.body);
  res.set('Access-Control-Allow-Origin', '*');
  let putStatement2 = 'UPDATE `companies` SET `numOfRatings` = `numOfRatings`+1 WHERE `companyName` = ("' + body.theTitle + '")'
  con.query(putStatement2, function (err, res) {
    if (err) throw err;
    console.log("updated review length");
  })
  res.send('PUT Request');
});




app.listen(4000, () => {
  console.log("Listening to grapevine server on port 4000");
})



