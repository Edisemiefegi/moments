import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { getFirestore, doc, setDoc } from "firebase/firestore";

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

export { app, db, doc, setDoc };
