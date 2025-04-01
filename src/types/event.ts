
export type ImportanceLevel = "low" | "medium" | "high";

export interface Event {
  id: string;
  title: string;
  date: Date;
  description: string;
  importance: ImportanceLevel;
}
