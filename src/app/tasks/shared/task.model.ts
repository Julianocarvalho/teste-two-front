export class Task {
  constructor(
    public id: number,
    public title: string,
    public project_id: number,
    public description?: string,
    public elapsed_time?: number,

  ) { }
}