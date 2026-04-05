import { ID, storage } from "@/appwriteConfig";
import type { TimelineSchemaType } from "@/schema/dashboard";
import {
  db,
  addDoc,
  collection,
  updateDoc,
  query,
  where,
  onSnapshot,
  doc,
} from "@/services/firebase";
import { useStore } from "@/store/Store";

export const useMoments = () => {
  const { currentUser, setUserTimelines } = useStore();
  const bucketId = (import.meta as any).env.VITE_APPWRITE_BUCKET_ID;

  function convertFirestoreDate(date: any): Date {
    if (!date) return new Date();

    if (date.toDate) {
      return date.toDate();
    }

    return new Date(date);
  }

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
      photos: photoUrl || "",
      userid: currentUser?.userid,
      id: "",
    };

    const docRef = await addDoc(collection(db, "timeline"), data);
    await updateDoc(docRef, {
      id: docRef.id,
    });
  };

  const updateTimeline = async (id: string, payload: TimelineSchemaType) => {
    let photoUrl: string | undefined = undefined;

    if (payload.photos instanceof File) {
      photoUrl = await uploadFileAndGetUrl(payload.photos);
    }

    const data: any = {
      title: payload.title,
      date: payload.date,
      icon: payload.icon,
      note: payload.note,
    };

    if (photoUrl) {
      data.photos = photoUrl;
    }

    await updateDoc(doc(db, "timeline", id), data);
  };

  const getUserTimeline = () => {
    const q = query(
      collection(db, "timeline"),
      where("userid", "==", currentUser?.userid),
    );

    onSnapshot(q, (querySnapshot) => {
      const data: any[] = [];

      querySnapshot.forEach((doc) => {
        const item = doc.data();

        data.push({
          ...item,
          date: convertFirestoreDate(item.date),
        });
      });

      data.sort((a, b) => b.date - a.date);
      setUserTimelines(data);
    });
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
    updateTimeline,
  };
};
