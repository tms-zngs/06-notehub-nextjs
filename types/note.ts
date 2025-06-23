export type TagName = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
export interface Note {
  id: number;
  title: string;
  content: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}
export interface NoteFormValues {
  title: string;
  content: string;
  tag: TagName;
}
