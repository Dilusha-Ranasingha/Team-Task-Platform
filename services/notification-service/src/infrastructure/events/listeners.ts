import { eventBus } from "../../eventBus";

import { SaveNotificationUseCase } from "../../application/use-cases/SaveNotificationUseCase";
import { NotificationRepositoryMongo } from "../repositories/NotificationRepositoryMongo";

const notificationRepo = new NotificationRepositoryMongo();
const saveNotification = new SaveNotificationUseCase(notificationRepo);

// When user registers
eventBus.on("USER_CREATED", async (data) => {
  await saveNotification.execute(data.userId, `Welcome ${data.email}!`);
});

// When a task is created
eventBus.on("TASK_CREATED", async (data) => {
  await saveNotification.execute("system", `New task created: ${data.title}`);
});

// When a task is assigned to a user
eventBus.on("TASK_ASSIGNED", async (data) => {
  await saveNotification.execute(data.userId, `You were assigned a task`);
});