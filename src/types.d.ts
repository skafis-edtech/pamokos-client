export type UserRole = "STUDENT" | "TEACHER";

export interface LessonCreate {
  title: string;
  groupId: string;
  date: string;
  content: string;
  recording: string;
  meetingLink: string;
  participated: string[];
  onlyUseContent: string[];
}

export interface Lesson extends LessonCreate {
  id: string;
}
