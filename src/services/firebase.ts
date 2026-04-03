import { initializeApp } from "firebase/app";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSO1WsBqlOKugcCiMhkW89oP8uOZgd454",
  authDomain: "moments-19048.firebaseapp.com",
  projectId: "moments-19048",
  storageBucket: "moments-19048.firebasestorage.app",
  messagingSenderId: "462708113603",
  appId: "1:462708113603:web:6cf40acdb670628d232276",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  app,
  db,
  doc,
  setDoc,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  addDoc,
  getDoc,
  signOut,
};
