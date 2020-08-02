const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("نام کاربری یا رمز عبور نامعتبر است");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("نام کاربری یا رمز عبور نامعتبر است");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    username: Joi.string().trim().length(10).required(),
    password: Joi.string().trim().required().min(3).max(255),
  });
  return schema.validate(req);
}

module.exports = router;
