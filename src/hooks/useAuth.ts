import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  setDoc,
  getDoc,
  signOut,
  query,
  collection,
  where,
  getDocs,
} from "@/services/firebase";
import { useStore } from "@/store/Store";
import type { User } from "@/types";

interface AuthPayload {
  email: string;
  password: string;
  name?: string;
}

export const useAuth = () => {
  const { setCurrentUser } = useStore();

  const signup = async (payload: AuthPayload) => {
    try {
      const q = query(
        collection(db, "user"),
        where("name", "==", payload.name),
      );

      const existingUser = await getDocs(q);

      if (!existingUser.empty) {
        throw new Error("Username already taken");
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password,
      );

      const user = userCredential.user;

      const data = {
        name: payload.name || "",
        email: payload.email,
        userid: user.uid,
      };

      await setDoc(doc(db, "user", user.uid), data);
      setCurrentUser(data);
    } catch (error: any) {
      console.error("Signup error:", error.message);
      throw error;
    }
  };

  const signin = async (payload: AuthPayload) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password,
      );

      const user = userCredential.user;
      const docSnap = await getDoc(doc(db, "user", user.uid));

      if (docSnap.exists()) {
        const userData = docSnap.data() as User;
        setCurrentUser(userData);
      } else {
        console.log("No such document!");
      }
    } catch (error: any) {
      console.error("Signin error:", error.message);
      throw error;
    }
  };

  const signout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  return {
    signup,
    signin,
    signout,
  };
};
