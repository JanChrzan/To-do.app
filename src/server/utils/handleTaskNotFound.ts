import express from "express";

export const handleTaskNotFound = (res: express.Response) => {
  return res.status(404).send({ message: "Task not found." });
};
