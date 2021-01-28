const mongoose = require("mongoose");
const winston = require("winston");
require("dotenv").config();

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_DB
  } = process.env;


let db_url;
const env = process.env.NODE_ENV || 'development';
if ( env === "development" ) {
  db_url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@ticket.6z9ee.mongodb.net/${MONGO_DB}?retryWrites=false&w=majority`;
} else {
  db_url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@ticket.6z9ee.mongodb.net/${MONGO_DB}?retryWrites=false&w=majority`;
}

module.exports = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect( db_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    poolSize: 5,
    retryWrites: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  } )
    .then( () => {
      winston.info( "Connection to database established" );
    } )
    .catch( err => {
      winston.error( `Connection failed. ${ err.message }` );
    } );
  
  mongoose.set( "useFindAndModify", false );
  mongoose.set( "useCreateIndex", true );
}