

import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("TASK ROUTES WORKING");
});

// Protect all routes with authMiddleware
router.use(authMiddleware);

// GET /api/tasks → get all tasks for user
router.get("/", getTasks);

// POST /api/tasks → create new task
router.post("/", createTask);

// PUT /api/tasks/:id → update a task
router.put("/:id", updateTask);

// DELETE /api/tasks/:id → delete a task
router.delete("/:id", deleteTask);

export default router;
