import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("🟢 Connected to MongoDB (Notification Service)");
  } catch (error) {
    console.error("🔴 MongoDB Connection Error (Notification Service):", error);
    process.exit(1);
  }
};