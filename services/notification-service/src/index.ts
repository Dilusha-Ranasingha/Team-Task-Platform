import express from "express";
import dotenv from "dotenv";
import "./infrastructure/events/listeners";
import { connectDB } from "./infrastructure/db/mongoose";
import notificationRoutes from "./presentation/routes/notificationRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Notification Service Running");
});

const startServer = async () => {
  await connectDB();

  app.listen(3003, () => {
    console.log("Notification Service running on port 3003");
  });
};

startServer();