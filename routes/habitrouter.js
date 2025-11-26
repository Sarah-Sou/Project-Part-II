const express = require("express");
const Habit = require("../models/habit");
const requireLogin = require("../middleware/requireLogin");

const router = express.Router();


router.get("/", requireLogin, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.session.user._id });
    res.render("view", { habits });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});


router.get("/create", requireLogin, (req, res) => {
  res.render("create");
});


router.post("/create", requireLogin, async (req, res) => {
  try {
    const { name, description, frequency } = req.body;

    await Habit.create({
      name,
      description,
      frequency,
      userId: req.session.user._id
    });

    res.redirect("/habits");
  } catch (err) {
    console.error(err);
    res.redirect("/habits");
  }
});


router.get("/:id/edit", requireLogin, async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.session.user._id
    });

    if (!habit) return res.redirect("/habits");

    res.render("edit", { habit });
  } catch (err) {
    console.error(err);
    res.redirect("/habits");
  }
});


router.post("/:id/edit", requireLogin, async (req, res) => {
  try {
    const { name, description, frequency } = req.body;

    await Habit.findOneAndUpdate(
      { _id: req.params.id, userId: req.session.user._id },
      { name, description, frequency }
    );

    res.redirect("/habits");
  } catch (err) {
    console.error(err);
    res.redirect("/habits");
  }
});

router.post("/:id/delete", requireLogin, async (req, res) => {
  try {
    await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.session.user._id
    });

    res.redirect("/habits");
  } catch (err) {
    console.error(err);
    res.redirect("/habits");
  }
});


