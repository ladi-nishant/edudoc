import express from "express";
import User from "../models/User.js";
const router = express.Router();
router.post("/check-username", async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.json({ success: false, message: "Username required" });
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ success: false, message: "User not found" });
    return res.json({ success: true, message: "Username valid" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.post("/verify-password", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ success: false, message: "User not found" });
    if (user.password !== password)
      return res.json({ success: false, message: "Invalid password" });
    return res.json({ success: true, message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
