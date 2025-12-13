import express from "express";
import Document from "../models/Document.js";
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const { q = "", type = "" } = req.query;
    console.log("Incoming query:", req.query);
    const filter = {};
    if (q.trim()) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { snippet: { $regex: q, $options: "i" } },
        { source: { $regex: q, $options: "i" } },
        { ref: { $regex: q, $options: "i" } }
      ];
    }
    if (type.trim()) {
      filter.type = { $regex: `^${type}$`, $options: "i" };
    }
    const docs = await Document.find(filter)
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: docs.length,
      docs
    });
  } catch (error) {
    console.error("Docs fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});
export default router;
