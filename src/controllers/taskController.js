import Task from "../models/Task.js";

// 1️⃣ Get all tasks for logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 2️⃣ Create a new task
export const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTask = await Task.create({
      user: req.user.id,
      title,
      description,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 3️⃣ Update a task
export const updateTask = async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.completed = completed ?? task.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 4️⃣ Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.remove();
    res.json({ message: "Task removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
