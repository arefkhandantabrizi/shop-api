const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const School = mongoose.model(
  "School",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    grade: {
      type: [String],
      required: true,
    },
  })
);

function validateSchool(school) {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    grade: Joi.array().required(),
  });
  return schema.validate(school);
}

exports.School = School;
exports.validate = validateSchool;
