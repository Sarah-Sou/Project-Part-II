const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

// GET Register page
router.get("/register", (req, res) => {
  res.render("register", { error: null });
});

// POST Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Check for duplicate email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.render("register", { error: "Email already registered" });
  }

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hash
  });

  res.redirect("/login");
});

// GET Login page
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// POST Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.render("login", { error: "Invalid email or password" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.render("login", { error: "Invalid email or password" });
  }

  req.session.user = user;
  res.redirect("/habits");
});

// LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
