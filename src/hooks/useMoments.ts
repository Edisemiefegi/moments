import { ID, storage } from "@/appwriteConfig";
import type { TimelineSchemaType } from "@/schema/dashboard";
import {
  db,
  addDoc,
  collection,
  updateDoc,
  query,
  where,
} from "@/services/firebase";
import { useStore } from "@/store/Store";
import { getDocs } from "@firebase/firestore";

export const useMoments = () => {
  const { currentUser, setUserTimelines } = useStore();
  const bucketId = (import.meta as any).env.VITE_APPWRITE_BUCKET_ID;

  const addTimeline = async (payload: TimelineSchemaType) => {
    let photoUrl: string | undefined = undefined;

    if (payload.photos) {
      photoUrl = await uploadFileAndGetUrl(payload.photos);
    }

    const data = {
      title: payload.title,
      date: payload.date,
      icon: payload.icon,
      note: payload.note,
      photos: photoUrl,
      userid: currentUser?.userid,
      id: "",
    };

    const docRef = await addDoc(collection(db, "timeline"), data);
    await updateDoc(docRef, {
      id: docRef.id,
    });
  };

  const getUserTimeline = async () => {
    const q = query(
      collection(db, "timeline"),
      where("userid", "==", currentUser?.userid),
    );
    const data: any[] = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    data.sort((a, b) => b.date - a.date);
    setUserTimelines(data);
  };

  const uploadFileAndGetUrl = async (file: any): Promise<string> => {
    try {
      const uploaded = await storage.createFile({
        bucketId: bucketId,
        fileId: ID.unique(),
        file,
      });

      const url = storage.getFileDownload(bucketId, uploaded.$id);
      //   console.log("File URL:", url);
      return url;
    } catch (err) {
      console.error("File upload failed:", err);
      throw err;
    }
  };
  return {
    addTimeline,
    getUserTimeline,
  };
};
