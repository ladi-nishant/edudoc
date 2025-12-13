import mongoose from "mongoose";
const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    snippet: String,
    description: String,
    publishedAt: Date,
    ref: String,
    source: String,
    tags: { type: [String], default: [] },
    type: { type: String, enum: ["regulation", "policy", "scheme", "project"] }
  },
  { timestamps: true }
);
export default mongoose.model("Document", documentSchema);
