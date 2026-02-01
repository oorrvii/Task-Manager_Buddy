import express from "express"; // let us creates server and routes
import cors from "cors";// allows frontend to talk to backend
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express(); // creates the express app

// middleware
app.use(cors()); // cross-origin acces
app.use(express.json());// allows reading json body from requests
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
