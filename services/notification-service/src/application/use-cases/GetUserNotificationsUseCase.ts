import { INotificationRepository } from "../../domain/repositories/INotificationRepository";

export class GetUserNotificationsUseCase {
  constructor(private notificationRepo: INotificationRepository) {}

  async execute(userId: string) {
    return await this.notificationRepo.findByUserId(userId);
  }
}