const express = require("express");
const { registerUser, getUsers, assignTask } = require("../controllers/userController");
const router = express.Router();
const User = require("../models/User.js");

// POST route to register a new user
router.post("/users", async (req, res) => {
    const { name, email } = req.body;
  
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }
  
    try {
      const newUser = new User({ name, email });
      await newUser.save();
      return res.status(201).json({ message: "User registered successfully!", user: newUser });
    } catch (error) {
      return res.status(500).json({ message: "Error registering user", error: error.message });
    }
}); 
router.get("/users", getUsers);
router.post("/assign-task", assignTask);

module.exports = router;
