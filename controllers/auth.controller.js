const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullName } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      req.flash("error", "User already exists");
      return res.status(400).send("User already exists");
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          req.flash("error", err.message);
          return res.send(err.message);
        } else {
          let user = await User.create({
            email,
            password: hash,
            fullName,
          });
          let token = generateToken(user);

          res.cookie("token", token);
          req.flash("success", "User created successfully");
          res.redirect("/");
        }
      });
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "User not found");
      return res.status(400).redirect('/');
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Invalid credentials");
      return res.status(400).redirect('/users/login');
    }
    res.cookie("token", generateToken(user));
    req.flash("success", "User logged in successfully");
    return res.status(201).redirect('/shop');
  } catch (error) {
    req.flash("error", error.message);
    return res.status(400).redirect('/users/login');
  }
};

module.exports.logoutUser = async (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
