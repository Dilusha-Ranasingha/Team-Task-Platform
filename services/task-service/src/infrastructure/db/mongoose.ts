import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("🟢 Connected to MongoDB (Task Service)");
  } catch (error) {
    console.error("🔴 MongoDB Connection Error (Task Service):", error);
    process.exit(1);
  }
};