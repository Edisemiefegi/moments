import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  setDoc,
  getDoc,
  signOut,
  deleteUser,
  sendPasswordResetEmail,
  limit,
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
  const { setCurrentUser, resetUser } = useStore();

  const signup = async (payload: AuthPayload) => {
    try {
      // Create the account first: usernames can only be read while signed in.
      const { user } = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password,
      );

      const data = {
        name: payload.name || "",
        email: payload.email,
        userid: user.uid,
      };

      try {
        const existingUser = await getDocs(
          query(
            collection(db, "user"),
            where("name", "==", data.name),
            limit(1),
          ),
        );

        if (!existingUser.empty) {
          throw new Error("Username already taken");
        }

        await setDoc(doc(db, "user", user.uid), data);
      } catch (error) {
        // Don't leave an account without a profile behind.
        await deleteUser(user);
        throw error;
      }

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
      resetUser();
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

  return {
    signup,
    signin,
    signout,
    resetPassword,
  };
};
