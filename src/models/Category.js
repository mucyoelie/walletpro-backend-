import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    categoryName: { type: String, required: true },
    subcategories: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
