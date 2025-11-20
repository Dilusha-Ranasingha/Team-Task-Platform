export class Task {
  constructor(
    public id: string | null,
    public title: string,
    public description: string,
    public assignedTo: string | null,  // userId (from User Service)
    public status: "TODO" | "IN_PROGRESS" | "DONE",
  ) {}
}