import {
  db,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  onSnapshot,
  setDoc,
  doc,
} from "@/services/firebase";
import { useStore } from "@/store/Store";
import { useMoments } from "./useMoments";

export const useIdeas = () => {
  const { setSavedIdeas, currentUser } = useStore();
  const { convertFirestoreDate } = useMoments();

  const addSavedIdea = async (payload: any) => {
    if (!currentUser) return;
    try {
      const newIdeas = {
        id: payload.id,
        title: payload.title,
        description: payload.description,
        userId: currentUser.userid,
      };

      await setDoc(doc(db, "savedIdeas", `${currentUser.userid}_${newIdeas.id}`), newIdeas);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const removeSavedIdea = async (id: string) => {
    try {
      const q = query(
        collection(db, "savedIdeas"),
        where("userId", "==", currentUser?.userid),
        where("id", "==", id),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        await Promise.all(querySnapshot.docs.map((d) => deleteDoc(d.ref)));
      } else {
        console.warn("Attempted to remove a saved idea that doesn't exist.");
      }
    } catch (error: any) {
      console.error("Error removing saved idea:", error);
      throw new Error(`Failed to remove idea: ${error.message}`);
    }
  };

  const getSavedIdeas = () => {
    try {
      const q = query(
        collection(db, "savedIdeas"),
        where("userId", "==", currentUser?.userid),
      );

      return onSnapshot(q, (snapshot) => {
        const data: any = [];
        snapshot.forEach((doc) => {
          const item = doc.data();
          data.push({
            ...item,
            createdAt: convertFirestoreDate(item.createdAt),
          });
        });
        setSavedIdeas(data);
      });
    } catch (error) {
      throw error;
    }
  };

  return {
    addSavedIdea,
    removeSavedIdea,
    getSavedIdeas,
  };
};
