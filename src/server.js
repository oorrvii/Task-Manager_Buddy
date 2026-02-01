import dotenv from "dotenv"; //allows us to read .env variables
import app from "./app.js"; //imports the express app
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();// loads variables from .env into process.env
connectDB();

const PORT = process.env.PORT || 5000;
console.log("Mongo URI:", process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
