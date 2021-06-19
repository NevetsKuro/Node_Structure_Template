require("./config/mongodb.js");

var os = require("os");
const cors = require("cors");
const express = require("express");

const bodyParser = require("body-parser");
const path = require("path");

let app = express();
const port = process.env.PORT || 5000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({ origin: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  // console.log(req.id);
});



//routes
const placeRoutes = require("./routes/Place/place.routes");

// app.use("/api/", );
app.use("/place", placeRoutes);


app.get("/", (req, res) => {
  // res.send("Server is running");
  res.render('index')
});
app.get("/place/", (req, res) => {
  res.render('search')
});

app.listen(port, () => console.log(`Listening to port ${port}`));



