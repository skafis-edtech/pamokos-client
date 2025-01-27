export type UserRole = "STUDENT" | "TEACHER";
export type LessonState = "ONGOING" | "PAST" | "LOCKED";
export type BillEvent =
  | "CLICKED_ON_PARTICIPATION_LINK"
  | "ENROLLED"
  | "REMOVED_FROM_PARTICIPATED_LIST"
  | "DEROLLED";

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
}

export interface Group {
  id: string;
  name: string;
  description: string;
  studentIds: string[];
  teacherId: string;
}

export interface Bill {
  id: string;
  amount: number;
  from: string;
  to: string;
  studentId: string;
  teacherId: string;
  isPaid: boolean;
  writtenAt: string;
  paidAt: string;
  description: string;
  events: { event: BillEvent; timestamp: string }[];
}
