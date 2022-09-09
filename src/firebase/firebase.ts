import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "khao-chat.firebaseapp.com",
  projectId: "khao-chat",
  storageBucket: "khao-chat.appspot.com",
  messagingSenderId: "152759763933",
  appId: "1:152759763933:web:5c86d23035e2fba0bfec34",
  measurementId: "G-MNNHWHDPW8",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
