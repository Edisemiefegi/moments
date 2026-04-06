import { ID, storage } from "@/appwriteConfig";
import type { DateSchemaType, TimelineSchemaType } from "@/schema/dashboard";
import {
  db,
  addDoc,
  collection,
  updateDoc,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  getDocs,
} from "@/services/firebase";
import { useStore } from "@/store/Store";

export const useMoments = () => {
  const { currentUser, setUserTimelines, setDates, setNotifications } =
    useStore();
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

  const deleteTimeline = async (id: string) => {
    try {
      await deleteDoc(doc(db, "timeline", id));
    } catch (error) {
      throw error;
    }
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

  const sendDateInvite = async (payload: DateSchemaType) => {
    const q = query(
      collection(db, "user"),
      where("name", "==", payload.sendTo),
    );

    let querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("User not found");
    }

    const receiver = querySnapshot.docs[0].data();

    const data = {
      title: payload.title,
      location: payload.location,
      date: payload.date,
      time: payload.time,
      activity: payload.activity,
      note: payload.note,
      senderId: currentUser?.userid,
      receiverId: receiver.userid,
      receiverEmail: receiver.email,
      createdAt: new Date(),
      id: "",
      status: payload.status,
      sendTo: payload.sendTo,
    };

    console.log(data, "this is jsjsj");

    const docRef = await addDoc(collection(db, "dates"), data);
    await updateDoc(docRef, {
      id: docRef.id,
    });

    const notification = {
      userId: receiver.userid,
      message: `${currentUser?.name} invited you on a date`,
      type: "date-invite",
      dateId: docRef.id,
    };

    console.log(notification, "ssnnotificatiion");

    await addNotification(notification);
  };

  const getAllDates = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "dates"));
      const data: any = [];
      querySnapshot.forEach((doc) => {
        const item = doc.data();

        data.push({
          ...item,
          date: convertFirestoreDate(item.date),
        });
      });
      setDates(data);
    } catch (error) {
      throw error;
    }
  };

  const addNotification = async (payload: any) => {
    try {
      const notification = {
        userId: payload.userId,
        senderId: currentUser?.userid,
        message: payload.message,
        type: payload.type,
        dateId: payload.dateId,
        read: false,
        createdAt: new Date(),
        id: "",
      };
      const docRef = await addDoc(
        collection(db, "notifications"),
        notification,
      );

      await updateDoc(docRef, {
        id: docRef.id,
      });
    } catch (error) {
      throw error;
    }
  };

  const getUserNotifications = () => {
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", currentUser?.userid),
    );

    onSnapshot(q, (snapshot) => {
      const data: any[] = [];

      snapshot.forEach((doc) => {
        const item = doc.data();

        data.push({
          ...item,
          createdAt: convertFirestoreDate(item.createdAt),
        });
      });

      data.sort((a, b) => b.createdAt - a.createdAt);

      setNotifications(data);
    });
  };

  const markNotificationAsRead = async (id: string) => {
    await updateDoc(doc(db, "notifications", id), {
      read: true,
    });
    console.log(id, "djdjd");
  };
  return {
    addTimeline,
    getUserTimeline,
    updateTimeline,
    deleteTimeline,
    sendDateInvite,
    getAllDates,
    getUserNotifications,
    markNotificationAsRead,
  };
};
