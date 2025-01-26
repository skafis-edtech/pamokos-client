export type UserRole = "STUDENT" | "TEACHER";
export type LessonState = "ONGOING" | "PAST" | "LOCKED";

export interface LessonCreate {
  title: string;
  groupId: string;
  startedAt: string;
  endedAt: string;
  content: string;
  recording: string;
  meetingLink: string;
  participated: string[];
  onlyUseContent: string[];
}

export interface Lesson extends LessonCreate {
  id: string;
  locked: boolean;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  studentIds: string[];
  teacherId: string;
}
