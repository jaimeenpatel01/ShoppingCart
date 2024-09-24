const jwt = require("jsonwebtoken");
const user = require("../models/user.model");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  //if token is not found show error
  if (!req.cookies.token) {
    req.flash("error", "You need to login first");
    return res.redirect("/");
  }

  //verify the token
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    const user = await User.findOne({ email: decoded.email }).select(
      "-password"
    );
    req.user = user;
    next();
  } catch (error) {
    req.flash("error", "something went wrong");
    return res.redirect("/");
  }
};
