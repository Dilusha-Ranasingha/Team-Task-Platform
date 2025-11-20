import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./infrastructure/db/mongoose";
import taskRoutes from "./presentation/routes/taskRoutes";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Service Running");
});

const startServer = async () => {
  await connectDB();

  app.listen(3002, () => {
    console.log("Task Service running on port 3002");
  });
};

startServer();