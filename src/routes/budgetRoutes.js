import express from "express";
import Budget from "../models/Budget.js"; // make sure path is correct

const router = express.Router();

// Create a new budget
router.post("/", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const newBudget = new Budget({ userId, amount });
    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a budget by ID
router.get("/:id", async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: "Budget not found" });
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a budget (amount or currentSpent)
router.put("/:id", async (req, res) => {
  try {
    const { amount, currentSpent } = req.body;

    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: "Budget not found" });

    if (amount !== undefined) budget.amount = amount;
    if (currentSpent !== undefined) budget.currentSpent = currentSpent;

    // Update exceeded status
    budget.exceeded = budget.currentSpent > budget.amount;

    const updatedBudget = await budget.save();
    res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a budget
router.delete("/:id", async (req, res) => {
  try {
    const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
    if (!deletedBudget) return res.status(404).json({ message: "Budget not found" });
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
