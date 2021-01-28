const winston = require( 'winston' );
require( 'winston-mongodb' );
require( 'express-async-errors' );
require( "dotenv" );

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_DB
  } = process.env;
  
let db_url;
const env = process.env.NODE_ENV || 'development';
if ( env === "development" ) {
  db_url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@ticket.6z9ee.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;
} else {
  db_url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@ticket.6z9ee.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;
}

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.File( { filename: 'uncaughtException.log' } ),
    new winston.transports.Console( { colorize: true, prettyPrint: true } )
  )

  process.on( 'unhandledRejection', ( ex ) => {
    throw ex;
  } );

  winston.add( winston.transports.File, { filename: 'logFile.log' } );
  winston.add( winston.transports.MongoDB, {
    db: db_url,
    level: 'info'
  } );
}