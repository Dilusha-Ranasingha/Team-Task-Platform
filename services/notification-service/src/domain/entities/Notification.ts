export class Notification {
  constructor(
    public id: string | null,
    public userId: string,
    public message: string,
    public read: boolean,
    public createdAt: Date
  ) {}
}