import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTU6pgRVz_o8p5NWv96nhId-hTN1RjJR4",
  authDomain: "pamokos-skafis.firebaseapp.com",
  projectId: "pamokos-skafis",
  storageBucket: "pamokos-skafis.firebasestorage.app",
  messagingSenderId: "629238306267",
  appId: "1:629238306267:web:1f290e84937680adcb03fe",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
