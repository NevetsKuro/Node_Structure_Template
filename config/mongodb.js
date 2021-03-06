var mongoose = require("mongoose");

var dbURI = 'mongodb+srv://admin:admin@cluster0.7l1qp.mongodb.net/hireBus?retryWrites=true&w=majority';

mongoose.connect(
  dbURI,
  { useNewUrlParser: true }
);

mongoose.connection.on("connected", function () {
  console.log("Moongoose Connected");
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
