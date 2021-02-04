const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const converter = require("./routes/api/converter");
const harmonize = require("./routes/api/harmonize");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

app.get("/", (req, res) => res.send("Hello Worlds"));
app.use("/api/converter", converter)

app.use("/api/harmonize", harmonize)

app.get("/download", (req, res) => {
  console.log('route suceeded finally')
  var options = {
    root: path.join(__dirname, '/public')
  };

  var fileName = 'test.txt';
  res.download(__dirname + '/public/test.txt', 'test.txt' )
})


app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
