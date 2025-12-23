import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    amount: { type: Number, required: true },  // set limit
    currentSpent: { type: Number, default: 0 }, // auto-calculated

    exceeded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Budget", budgetSchema);
