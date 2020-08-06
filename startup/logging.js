const { createLogger, transports } = require("winston");
const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  const logger = createLogger({
    transports: [new transports.File({ filename: "combined.log" })],
  });

  logger.exceptions.handle(new transports.File({ filename: "exceptions.log" }));
  // winston.add(
  //   new winston.transports.MongoDB({
  //     db: "mongodb://localhost/shop",
  //     level: "error",
  //   })
  // );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
