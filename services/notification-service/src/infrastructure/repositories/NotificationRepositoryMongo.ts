import { INotificationRepository } from "../../domain/repositories/INotificationRepository";
import { Notification } from "../../domain/entities/Notification";
import { NotificationModel } from "../db/models/NotificationModel";

export class NotificationRepositoryMongo implements INotificationRepository {
  async create(notification: Notification): Promise<Notification> {
    const created = await NotificationModel.create({
      userId: notification.userId,
      message: notification.message,
      read: notification.read,
    });

    return new Notification(
      created._id.toString(),
      created.userId,
      created.message,
      created.read,
      created.createdAt
    );
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    const notifications = await NotificationModel.find({ userId }).sort({ createdAt: -1 });

    return notifications.map(
      (n) =>
        new Notification(
          n._id.toString(),
          n.userId,
          n.message,
          n.read,
          n.createdAt
        )
    );
  }
}