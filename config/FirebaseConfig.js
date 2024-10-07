import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "brainstorm-1e439.firebaseapp.com",
  projectId: "brainstorm-1e439",
  storageBucket: "brainstorm-1e439.appspot.com",
  messagingSenderId: "270079839173",
  appId: "1:270079839173:web:dc9ccda37d6833e835d9ac",
  measurementId: "G-MWMC6YPHHH"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);