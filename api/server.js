const express = require("express");
const path = require("path");
const socket = require('socket.io');
const http = require('http');
const morgan = require("morgan");
const bodyParser = require("body-parser");


const port = process.env.PORT || 4000;

const app = express();

require("./config/db")();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//==================================================
// Setting up Cross Origin Resource Sharing
//==================================================
app.use( ( req, res, next ) => {
  res.header( "Access-Control-Allow-Origin", "*" );
  res.header( "Access-Control-Allow-Credentials", true );
  res.header( "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH" );
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept, X-Auth-Token' );

  next();
} );

require("./middleware/prod")(app);

//==================================================
// Custom route middlware
//==================================================
require("./middleware/routes")(app);


// logger();
app.get("/", (req, res) => {
  res.json({ message: "Hello Express API" });
});

require("./config/error-log")();

const server = http.createServer(app);
const io = socket(server);

io.on("connection", socket => {

})

server.listen(port, () => console.log(`Server is up and running on port ${port}`));

module.exports = app;