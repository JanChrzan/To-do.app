import mongoose from "mongoose";
import { TypeTask } from "../../utils/TypeTask";

const taskSchema = new mongoose.Schema({
  id: { type: String, required: false },
  priority: { type: Number, required: true },
  taskName: { type: String, required: true },
  dueDate: { type: String, required: false },
  completionDate: { type: String, required: false },
  done: { type: Boolean, required: true },
});

export const Task = mongoose.model<TypeTask>("Task", taskSchema);
