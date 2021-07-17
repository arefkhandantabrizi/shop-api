const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  username: {
    type: String,
    minlength: 3,
    maxlength: 50,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});

adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      name: this.name,
      username: this.username,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);
function validateAdmin(admin) {
  const schema = Joi.object({
    name: Joi.string().trim().max(50).required(),
    username: Joi.string().trim().min(3).max(50).required(),
    password: Joi.string().trim().required().min(3).max(255),
  });
  return schema.validate(admin);
}

exports.Admin = Admin;
exports.validate = validateAdmin;
