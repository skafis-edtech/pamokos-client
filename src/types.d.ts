export type UserRole = "STUDENT" | "TEACHER";
export type LessonState = "ONGOING" | "PAST" | "LOCKED";
export type BillEvent =
  | "CLICKED_ON_PARTICIPATION_LINK"
  | "ENROLLED"
  | "REMOVED_FROM_PARTICIPATED_LIST"
  | "DEROLLED";
export type BillStatus = "PAID" | "UNPAID" | "NOT_SUBMITTED";
export type ToPayString = `(${number} + ${number})*5€=${number}€`;

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
  isPaid: boolean;
  writtenAt: string;
  paidAt: string;
  description: string;
  events: { event: BillEvent; timestamp: string }[];
}

export interface Bill extends BillDTO {
  id: string;
}

export interface ReportDTO {
  bills: {
    billId: string;
    status: BillStatus;
    studentId: string;
    toPayString: string;
  }[];
  from: string;
  to: string;
  teacherId: string;
}

export interface Report extends ReportDTO {
  id: string;
}
