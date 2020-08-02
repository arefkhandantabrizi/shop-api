const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { object } = require("joi");

const Invoice = mongoose.model(
  "Invoice",
  new mongoose.Schema({
    name: String,
    username: String,
    schoolname: String,
    schoolgrade: String,
    items: [
      {
        type: Object,
      },
    ],
    address: String,
    phone: String,
    totalprice: Number,
    ispayed: {
      type: Boolean,
      default: false,
    },
    paymentcode: {
      type: String,
    },
    proccessed: {
      type: Boolean,
      default: false,
    },
  })
);

function validateInvoice(invoice) {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    username: Joi.string().trim().required(),
    schoolgrade: Joi.string().required(),
    schoolname: Joi.string().required(),
    items: Joi.array(),
    address: Joi.string().max(255),
    phone: Joi.string().length(11),
    totalprice: Joi.number().required(),
    ispayed: Joi.boolean(),
    paymentcode: Joi.string(),
    proccessed: Joi.boolean(),
  });
  return schema.validate(invoice);
}

exports.Invoice = Invoice;
exports.validate = validateInvoice;
