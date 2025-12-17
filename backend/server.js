import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import docRoutes from "./routes/docRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("DB Error:", err));
app.use("/api/auth", authRoutes);
app.use("/api/docs", docRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.listen(5000, () => console.log("Server running on port 5000"));
