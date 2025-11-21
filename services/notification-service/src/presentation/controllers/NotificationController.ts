import { Request, Response } from "express";
import { SaveNotificationUseCase } from "../../application/use-cases/SaveNotificationUseCase";
import { GetUserNotificationsUseCase } from "../../application/use-cases/GetUserNotificationsUseCase";

export class NotificationController {
  constructor(
    private saveNotification: SaveNotificationUseCase,
    private getUserNotifications: GetUserNotificationsUseCase
  ) {}

  // API: GET /notifications/:userId
  getNotifications = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;

      const notifications = await this.getUserNotifications.execute(userId);

      res.json(notifications);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}