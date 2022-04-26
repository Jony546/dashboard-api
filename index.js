const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users");
const servicesRouter = require("./routes/services");
const bodyParser = require("body-parser");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const app = express();

function setVariables(req, res, next) {
  // passing variables
  res.locals.myCache = myCache;
  next();
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", setVariables, usersRouter);
app.use("/services", setVariables, servicesRouter);

// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.header("Access-Control-Allow-Origin", "*");

  res.status(err.status || 500);
});
