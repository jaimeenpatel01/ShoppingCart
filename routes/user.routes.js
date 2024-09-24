const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/auth.controller.js");
const express = require("express");
  const router = express.Router();

router.get("/", (req, res) => {
  const success = req.flash('success');
    res.send("Hello from user routes",{success});
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
module.exports = router;
