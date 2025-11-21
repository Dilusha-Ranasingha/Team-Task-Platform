import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

export const NotificationModel = mongoose.model("Notification", NotificationSchema);