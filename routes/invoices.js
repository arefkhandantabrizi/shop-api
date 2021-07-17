const { Invoice, validate } = require("../models/invoice");
const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
// const validateObjectId = require("../middleware/validateObjectId");
// const moment = require("moment-jalaali");
const { Router } = require("express");
const router = Router();

// moment().format("jYYYY/jM/jD");

router.get("/", [auth, admin], async (req, res) => {
  const invoices = await Invoice.find().select("-__v");
  res.send(invoices);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //   let invoice = await Invoice.findOne({ name: req.body.name });
  //   if (invoice) return res.status(400).send("این مدرسه قبلا ثبت شده است");

  invoice = new Invoice(
    _.pick(req.body, [
      "name",
      "username",
      "schoolname",
      "schoolgrade",
      "items",
      "address",
      "phone",
      "totalprice",
      "ispayed",
      "paymentcode",
      "proccessed",
    ])
  );
  await invoice.save();

  res.send(invoice);
});

router.put("/:id", [auth], async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const invoice = await Invoice.findByIdAndUpdate(
    req.body._id,
    { ispayed: req.body.ispayed, paymentcode: req.body.paymentcode },
    { new: true }
  );

  if (!invoice) return res.status(404).send("فاکتوری با این شناسه یافت نشد");

  res.send(invoice);
});

// router.delete("/:id", async (req, res) => {
//   const invoice = await Invoice.findByIdAndRemove(req.params.id);

//   if (!invoice) return res.status(404).send("مدرسه ای با این شناسه یافت نشد");

//   res.send(invoice);
// });

// router.get("/:id", validateObjectId, async (req, res) => {
//   const invoice = await Invoice.findById(req.params.id).select("-__v");

//   if (!invoice) return res.status(404).send("مدرسه ای با این شناسه یافت نشد");

//   res.send(invoice);
// });
module.exports = router;
