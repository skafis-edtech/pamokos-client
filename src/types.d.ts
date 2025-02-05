export type UserRole = "STUDENT" | "TEACHER";
export type LessonState = "ONGOING" | "PAST" | "LOCKED";
// export type BillEvent =
//   | "CLICKED_ON_PARTICIPATION_LINK"
//   | "ENROLLED"
//   | "REMOVED_FROM_PARTICIPATED_LIST"
//   | "DEROLLED";
export type BillStatus = "IN_PROGRESS" | "PENDING" | "READY" | "PAID" | "LATE";

export interface LessonDTO {
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

export interface Lesson extends LessonDTO {
  id: string;
}

export interface GroupDTO {
  name: string;
  description: string;
  studentIds: string[];
  teacherId: string;
}

export interface Group extends GroupDTO {
  id: string;
}

export interface BillDTO {
  amount: number;
  from: string;
  to: string;
  studentId: string;
  teacherId: string;
  status: BillStatus;
}

export interface Bill extends BillDTO {
  id: string;
}

export interface ReportDTO {
  bills: string[];
  from: string;
  to: string;
  teacherId: string;
}

export interface Report extends ReportDTO {
  id: string;
}
