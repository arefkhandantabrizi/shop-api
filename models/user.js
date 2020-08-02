const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  username: {
    type: String,
    minlength: 10,
    maxlength: 10,
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
  schoolname: {
    type: String,
    required: true,
  },
  schoolgrade: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      username: this.username,
      schoolname: this.schoolname,
      schoolgrade: this.schoolgrade,
      gender: this.gender,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().trim().max(50).required(),
    username: Joi.string().trim().length(10).required(),
    password: Joi.string().trim().required().min(3).max(255),
    schoolname: Joi.string().trim().required(),
    schoolgrade: Joi.string().trim().required(),
    gender: Joi.string().required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
