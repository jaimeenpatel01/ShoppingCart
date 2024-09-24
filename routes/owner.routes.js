const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner.model");


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

router.get("/admin", (req, res) => {
  const success = req.flash('success');
  res.render("createproducts", { success });
});


module.exports = router;
