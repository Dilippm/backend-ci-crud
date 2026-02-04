const router = require("express").Router();
const User = require("../models/user.model");

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.get("/", async (_, res) => {
  res.json(await User.find());
});

router.put("/:id", async (req, res) => {
  res.json(
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
});

router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
