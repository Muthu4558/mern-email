const User = require("../models/User");
const { sendMail } = require("../utils/mailer");

exports.registerUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignTask = async (req, res) => {
  const { taskTitle, taskDate, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const message = `Hello ${user.name},\n\nYou have been assigned a task: "${taskTitle}" due on ${taskDate}.\n\nBest regards, Task Manager`;
    await sendMail(user.email, "Task Assigned", message);
    res.status(200).json({ message: "Task assigned and email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
