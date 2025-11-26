require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

const authRouter = require("./routes/authRouter");
const habitRouter = require("./routes/habitRouter");

const app = express();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Makes session available in all EJS files
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Routers
app.use("/", authRouter);
app.use("/habits", habitRouter);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Render deployment port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
