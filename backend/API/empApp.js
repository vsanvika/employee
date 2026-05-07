import exp from "express";
import { EmpModel } from "../models/EmpModel.js";
export const empRoute = exp.Router();

// Helper to handle async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Create emp
empRoute.post("/employees", asyncHandler(async (req, res) => {
  const newEmp = req.body;
  const empDoc = new EmpModel(newEmp);
  await empDoc.save();
  res.status(201).json({ message: "Emp created" });
}));

// Read all emps
empRoute.get("/employees", asyncHandler(async (req, res) => {
  let empList = await EmpModel.find();
  res.status(200).json({ message: "list of emps", payload: empList });
}));

// Update emp id
empRoute.put("/employees/:id", asyncHandler(async (req, res) => {
  const modifiedEmp = req.body;
  let updatedEmp = await EmpModel.findByIdAndUpdate(
    req.params.id,
    { $set: { ...modifiedEmp } },
    { returnDocument: "after", runValidators: true }
  );
  if (!updatedEmp) {
    return res.status(404).json({ message: "emp not found" });
  }
  res.status(200).json({ message: "employee updated", payload: updatedEmp });
}));

// Delete emp by id
empRoute.delete("/employees/:id", asyncHandler(async (req, res) => {
  let deletedEmp = await EmpModel.findByIdAndDelete(req.params.id);
  if (!deletedEmp) {
    return res.status(404).json({ message: "emp not found" });
  }
  res.status(200).json({ message: "employee deleted", payload: deletedEmp });
}));