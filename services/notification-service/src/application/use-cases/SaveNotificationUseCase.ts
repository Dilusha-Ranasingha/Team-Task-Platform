import { INotificationRepository } from "../../domain/repositories/INotificationRepository";
import { Notification } from "../../domain/entities/Notification";

export class SaveNotificationUseCase {
  constructor(private notificationRepo: INotificationRepository) {}

  async execute(userId: string, message: string) {
    const notification = new Notification(
      null,
      userId,
      message,
      false,          // unread
      new Date()
    );

    return await this.notificationRepo.create(notification);
  }
}