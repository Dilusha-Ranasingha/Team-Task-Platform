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

export default router;