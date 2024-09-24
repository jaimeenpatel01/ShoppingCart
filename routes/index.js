const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn.middleware");
const Product = require("../models/product.model");
const User = require("../models/user.model");

router.get("/", (req, res) => {
  let error = req.flash("error");
  const success = req.flash("success");
  res.render("index", { error, success, loggedin: false });
});
router.get("/shop", isLoggedIn, async (req, res) => {
  try {
    let products = await Product.find();
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("shop", { products, success, error });
  } catch (error) {
    req.flash("error", "Failed to load products");
    res.redirect("/");
  }
});

router.get("/cart", isLoggedIn, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user.email }).populate("cart");
    res.render("cart", { cartItems: user.cart });
  } catch (error) {
    req.flash("error", "Failed to load cart items");
    res.redirect("/shop");
  }
});


router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user.email });
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success", "Product added to cart");
    res.redirect("/shop");
  } catch (error) {
    req.flash("error", "Failed to add product");
    res.redirect("/shop");
  }
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out successfully");
    res.redirect("/"); // Redirect to home or login page after logout
  });
});

module.exports = router;
