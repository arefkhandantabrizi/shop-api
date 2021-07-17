const express = require("express");
const error = require("../middleware/error");
const auth = require("../routes/auth");
const schools = require("../routes/schools");
const users = require("../routes/users");
const admins = require("../routes/admins");
const invoices = require("../routes/invoices");
const addPayments = require("../routes/addPayments");
const validatePayments = require("../routes/validatePayments");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/admins", admins);
  app.use("/api/schools", schools);
  app.use("/api/auth", auth);
  app.use("/api/invoices", invoices);
  app.use("/api/addPayments", addPayments);
  app.use("/api/validatePayments", validatePayments);

  app.use(error);
};
