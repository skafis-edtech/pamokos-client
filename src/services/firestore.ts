import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { BillDTO, Group, Lesson, LessonDTO, UserRole } from "../types";
import { auth, db } from "./firebaseConfig";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  defaultMonthEnd,
  defaultMonthStart,
  defaultTeacherId,
  lessonCost,
} from "../constants";

export const fetchUserRole = async (userId: string) => {
  const userDoc = doc(db, `users/${userId}`);
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    return userData.role as UserRole;
  }
  return null;
};

export const loginUser = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error("Error logging in: ", error);
    alert("Klaida: " + error.message);
  }
};

export const logoutUser = async () => {
  try {
    await auth.signOut();
  } catch (error: any) {
    console.error("Error logging out: ", error);
    alert("Klaida: " + error.message);
  }
};

export const restorePassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error("Error restoring password: ", error);
    alert("Klaida: " + error.message);
  }
};

export const fetchLesson = async (lessonId: string) => {
  const lessonDoc = doc(db, "lessons", lessonId);
  const lessonSnapshot = await getDoc(lessonDoc);
  if (lessonSnapshot.exists()) {
    return lessonSnapshot.data() as Lesson;
  }
  return null;
};

export const createLesson = async (lessonData: LessonDTO) => {
  const docRef = await addDoc(collection(db, "lessons"), lessonData);
  return docRef.id;
};

export const updateLesson = async (lessonId: string, lessonData: LessonDTO) => {
  const docRef = doc(db, "lessons", lessonId);
  await updateDoc(docRef, { ...lessonData });
  alert("Pamoka atnaujinta!");
};

export const deleteLesson = async (lessonId: string) => {
  const docRef = doc(db, "lessons", lessonId);
  await deleteDoc(docRef);
  alert("Pamoka ištrinta!");
};

export const getGroupStudentIds = async (groupId: string) => {
  const groupDoc = doc(db, "groups", groupId);
  const groupSnapshot = await getDoc(groupDoc);
  if (groupSnapshot.exists()) {
    const groupData = groupSnapshot.data();
    return groupData?.students || [];
  }
  return [];
};

export const getLessons = async (groupId: string) => {
  const lessonsRef = collection(db, "lessons");
  const lessonsQuery = query(
    lessonsRef,
    where("groupId", "==", groupId),
    orderBy("startedAt", "desc")
  );
  const lessonsSnapshot = await getDocs(lessonsQuery);
  return lessonsSnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Lesson)
  );
};

export const getGroupData = async (groupId: string) => {
  const groupDoc = doc(db, "groups", groupId);
  const groupSnapshot = await getDoc(groupDoc);
  if (groupSnapshot.exists()) {
    return groupSnapshot.data() as Group;
  }
  return null;
};

export const participate = async (lessonId: string, userId: string) => {
  const lessonDoc = doc(db, "lessons", lessonId);
  const lessonSnapshot = await getDoc(lessonDoc);
  if (lessonSnapshot.exists()) {
    const lessonData = lessonSnapshot.data() as Lesson;
    if (!lessonData.participated.includes(userId)) {
      lessonData.participated.push(userId);
      await updateDoc(lessonDoc, { participated: lessonData.participated });
      const billQuery = query(
        collection(db, "bills"),
        where("studentId", "==", userId),
        where("teacherId", "==", defaultTeacherId),
        where("from", "<=", new Date()),
        where("to", ">=", new Date())
      );
      const billSnapshot = await getDocs(billQuery);
      if (!billSnapshot.empty) {
        const billDoc = billSnapshot.docs[0];
        const billData = billDoc.data() as BillDTO;
        await updateDoc(billDoc.ref, { amount: billData.amount + lessonCost });
      } else {
        const newBill: BillDTO = {
          studentId: userId,
          teacherId: defaultTeacherId,
          from: defaultMonthStart,
          to: defaultMonthEnd,
          amount: lessonCost,
          status: "IN_PROGRESS",
        };
        await addDoc(collection(db, "bills"), newBill);
      }
      alert("Dalyvavimas užregistruotas! Atidaroma nuoroda");
    } else {
      alert("Jau esate užregistruoti, tik atidaroma nuoroda");
    }
  }
};

export const enroll = async (lessonId: string, userId: string) => {
  const lessonDoc = doc(db, "lessons", lessonId);
  const lessonSnapshot = await getDoc(lessonDoc);
  if (lessonSnapshot.exists()) {
    const lessonData = lessonSnapshot.data() as Lesson;
    if (!lessonData.onlyUseContent.includes(userId)) {
      lessonData.onlyUseContent.push(userId);
      await updateDoc(lessonDoc, { onlyUseContent: lessonData.onlyUseContent });
      const billQuery = query(
        collection(db, "bills"),
        where("studentId", "==", userId),
        where("teacherId", "==", defaultTeacherId),
        where("from", "<=", new Date()),
        where("to", ">=", new Date())
      );
      const billSnapshot = await getDocs(billQuery);
      if (!billSnapshot.empty) {
        const billDoc = billSnapshot.docs[0];
        const billData = billDoc.data() as BillDTO;
        await updateDoc(billDoc.ref, { amount: billData.amount + lessonCost });
      } else {
        const newBill: BillDTO = {
          studentId: userId,
          teacherId: defaultTeacherId,
          from: new Date(
            Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)
          ).toISOString(),
          to: new Date(
            Date.UTC(
              new Date().getUTCFullYear(),
              new Date().getUTCMonth() + 1,
              0
            )
          ).toISOString(),
          amount: lessonCost,
          status: "IN_PROGRESS",
        };
        await addDoc(collection(db, "bills"), newBill);
      }
      alert("Dalyvavimas užregistruotas!");
    } else {
      alert("Jūs jau užregistruotas! Klaida!");
    }
  }
};

export const getBillByStartDate = async (
  studentId: string,
  startDate: Date
) => {
  const billQuery = query(
    collection(db, "bills"),
    where("studentId", "==", studentId),
    where("from", "==", startDate.toISOString())
  );
  const billSnapshot = await getDocs(billQuery);
  if (!billSnapshot.empty && billSnapshot.docs.length === 1) {
    return billSnapshot.docs[0].data() as BillDTO;
  } else {
    return console.error("Bill not found");
  }
};
