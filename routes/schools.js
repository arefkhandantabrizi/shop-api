const { School, validate } = require("../models/school");
// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
// const moment = require("moment-jalaali");
const { Router } = require("express");
const router = Router();

// moment().format("jYYYY/jM/jD");

router.get("/", async (req, res) => {
  const schools = await School.find().select("-__v");
  res.send(schools);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let school = await School.findOne({ name: req.body.name });
  if (school) return res.status(400).send("این مدرسه قبلا ثبت شده است");

  school = new School({
    name: req.body.name,
    grade: req.body.grade,
  });
  await school.save();

  res.send(school);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const school = await School.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      grade: req.body.grade,
    },
    { new: true }
  );

  if (!school) return res.status(404).send("مدرسه ای با این شناسه یافت نشد");

  res.send(school);
});

router.delete("/:id", async (req, res) => {
  const school = await School.findByIdAndRemove(req.params.id);

  if (!school) return res.status(404).send("مدرسه ای با این شناسه یافت نشد");

  res.send(school);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const school = await School.findById(req.params.id).select("-__v");

  if (!school) return res.status(404).send("مدرسه ای با این شناسه یافت نشد");

  res.send(school);
});
module.exports = router;
