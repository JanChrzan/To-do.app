import express from "express";
import { Task } from "../schema/taskSchema.js";
import { handleError } from "../utils/handleError";
import { handleTaskNotFound } from "../utils/handleTaskNotFound";

export const appRouter = express.Router();

appRouter
  .get("/get-tasks", async (req, res) => {
    try {
      const tasks = await Task.find({}, { _id: false, __v: false });
      res.send(tasks);
    } catch (err) {
      handleError(res, err, 400);
    }
  })
  .post("/add-task", async (req, res) => {
    try {
      const { id, priority, taskName, dueDate, completionDate, done } =
        req.body;
      const task = new Task({
        id,
        priority,
        taskName,
        dueDate,
        completionDate,
        done,
      });
      await task.save();
      res.send({ message: "Task added successfully." });
    } catch (err) {
      handleError(res, err, 400);
    }
  })
  .delete("/remove-task/:id", async (req, res) => {
    try {
      await Task.findOneAndRemove({ id: req.params.id });
      res.send({ message: "Task removed successfully." });
    } catch (err) {
      handleError(res, err, 400);
    }
  })
  .put("/update-task/:id", async (req, res) => {
    try {
      const { id, priority, taskName, dueDate, completionDate, done } =
        req.body;
      const task = await Task.findOne({ id: req.params.id });
      if (!task) {
        return handleTaskNotFound(res);
      }
      task.id = id;
      task.priority = priority;
      task.taskName = taskName;
      task.dueDate = dueDate;
      task.completionDate = completionDate;
      task.done = done;
      await task.save();
      res.send({ message: "Task edited successfully." });
    } catch (err) {
      handleError(res, err, 400);
    }
  })
  .patch("/toggle-task-status/:id/:date", async (req, res) => {
    try {
      const task = await Task.findOne({ id: req.params.id });
      if (!task) {
        return handleTaskNotFound(res);
      }
      task.done = !task.done;
      task.completionDate = req.params.date;
      await task.save();
      res.send({ message: "Task status updated successfully." });
    } catch (err) {
      handleError(res, err, 400);
    }
  });
