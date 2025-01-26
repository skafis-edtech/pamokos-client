import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Group, Lesson, LessonCreate, UserRole } from "../types";
import { auth, db } from "./firebaseConfig";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

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

export const createLesson = async (lessonData: LessonCreate) => {
  const docRef = await addDoc(collection(db, "lessons"), lessonData);
  return docRef.id;
};

export const updateLesson = async (
  lessonId: string,
  lessonData: LessonCreate
) => {
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
  const lessonsQuery = query(lessonsRef, where("groupId", "==", groupId));
  const lessonsSnapshot = await getDocs(lessonsQuery);
  return lessonsSnapshot.docs.map(
    (doc) => ({ id: doc.id, locked: false, ...doc.data() } as Lesson)
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
