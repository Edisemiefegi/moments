import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@/services/firebase";

export const useAuth = () => {
  const signup = async (payload: any) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password,
    );
    const user = userCredential.user;

    console.log(user);
  };

  const signin = async (payload: any) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password,
    );
    const user = userCredential.user;
    console.log(user, 'signin');
    
  };

  return {
    signup,
    signin
  };
};
