// server.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/newsApp", { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  preferences: [String], // e.g., ["technology", "sports"]
  favorites: [String], // Store favorite news article IDs
});

const User = mongoose.model("User", UserSchema);

// Register
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.status(201).send("User Registered");
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid credentials");
  }
  const token = jwt.sign({ userId: user._id }, "secretkey");
  res.json({ token });
});

// Middleware to authenticate
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, "secretkey");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

// Get Favorites
app.get("/api/favorites", authenticate, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user.favorites);
});

// Add to Favorites
app.post("/api/favorites", authenticate, async (req, res) => {
  const { articleId } = req.body;
  const user = await User.findById(req.user.userId);
  user.favorites.push(articleId);
  await user.save();
  res.send("Added to favorites");
});

app.listen(5000, () => console.log("Server running on port 5000"));
