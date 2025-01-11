import { doc, getDoc } from "firebase/firestore";
import { UserRole } from "../types";
import { auth, db } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

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
