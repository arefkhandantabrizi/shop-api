const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const { Admin, validate } = require("../models/admin");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const admin = await Admin.findById(req.admin._id).select("-password");
  res.send(admin);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let admin = await Admin.findOne({ username: req.body.username });
  if (admin) return res.status(400).send("این نام کاربری قبلا استفاده شده است");

  admin = new Admin(_.pick(req.body, ["name", "username", "password"]));

  const salt = await bcrypt.genSalt(10);

  admin.password = await bcrypt.hash(admin.password, salt);
  await admin.save();

  const token = admin.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(
      token
      // _.pick(user, [
      //   "_id",
      //   "name",
      //   "username",
      //   "schoolname",
      //   "schoolgrade",
      //   "gender",
      // ])
    );
});

module.exports = router;
