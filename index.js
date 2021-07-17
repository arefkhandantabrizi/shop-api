const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();

require("./startup/logging")();
require("./startup/config")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/dataBase")();
require("./startup/validation")();
require("./startup/proud")(app);

const port = process.env.PORT || config.get("port");
app.listen(port, () => winston.info(`Listining on port ${port}....`));
