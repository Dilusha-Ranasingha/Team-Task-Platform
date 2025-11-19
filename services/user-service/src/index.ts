import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./infrastructure/db/mongoose";
import userRoutes from "./presentation/routes/userRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("User Service Running");
});

const startServer = async () => {
  await connectDB();

  app.listen(3001, () => {
    console.log("User Service running on port 3001");
  });
};

startServer();