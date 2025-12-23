import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },  // Bank, MoMo, Cash
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Account", accountSchema);
