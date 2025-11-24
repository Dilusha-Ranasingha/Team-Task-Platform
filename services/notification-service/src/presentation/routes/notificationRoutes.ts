import { Router } from "express";

import { NotificationRepositoryMongo } from "../../infrastructure/repositories/NotificationRepositoryMongo";

import { SaveNotificationUseCase } from "../../application/use-cases/SaveNotificationUseCase";
import { GetUserNotificationsUseCase } from "../../application/use-cases/GetUserNotificationsUseCase";

import { NotificationController } from "../controllers/NotificationController";

const router = Router();

// Dependency Injection
const notificationRepo = new NotificationRepositoryMongo();

const saveNotificationUseCase = new SaveNotificationUseCase(notificationRepo);
const getUserNotificationsUseCase = new GetUserNotificationsUseCase(notificationRepo);

const notificationController = new NotificationController(
  saveNotificationUseCase,
  getUserNotificationsUseCase
);

// Route: get notifications for a user
router.get("/:userId", notificationController.getNotifications);

// Internal route — create notification
router.post("/internal", async (req, res) => {
  try {
    const { userId, message } = req.body;

    const saved = await saveNotificationUseCase.execute(userId, message);

    res.status(201).json(saved);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;