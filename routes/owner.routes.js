const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner.model");

router.get("/", (req, res) => {
  res.send("Owner route");
});

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
        .status(400)
        .send("Owner already exists, cannot create another owner");
    }

    let { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).send("Missing required fields");
    }

    let owner = new ownerModel({ fullName, email, password });
    await owner.save();
    res.send(owner);
  });
}

module.exports = router;
