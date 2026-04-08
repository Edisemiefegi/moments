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
  getDoc,
} from "@/services/firebase";
import { useStore } from "@/store/Store";
import { showToast } from "@/types";
// import { sendInviteEmailNotification } from "@/services/email";

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
    if (
      payload.sendTo.trim().toLowerCase() === currentUser?.name?.toLowerCase()
    ) {
      throw new Error("You can’t send a date invite to yourself 😅");
    }
    const q = query(
      collection(db, "user"),
      where("name", "==", payload.sendTo),
    );

    let querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("User not found");
    }

    const receiver = querySnapshot.docs[0].data();
    if (receiver.userid === currentUser?.userid) {
      throw new Error("You can’t send a date invite to yourself 😅");
    }

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
    console.log(receiver, currentUser, "receiid");

    await addNotification(notification);
    // await sendInviteEmailNotification({
    //   toEmail: receiver.email,
    //   toName: receiver.name,
    //   fromName: currentUser?.name,
    //   fromEmail: currentUser?.email,
    //   date: convertFirestoreDate(payload.date).toDateString(),
    //   time: payload.time,
    //   location: payload.location,
    // });
  };

  const getAllDates = async () => {
    try {
      const q = query(collection(db, "dates"));

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

        setDates(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateDateStatus = async (dateId: string, newStatus: string) => {
    const dateRef = doc(db, "dates", dateId);

    await updateDoc(dateRef, { status: newStatus });

    const dateSnap = await getDoc(dateRef);
    const dateData = dateSnap.data();
    if (!dateData) return;

    const senderId = dateData.senderId;
    const receiverId = dateData.receiverId;

    const actionText =
      newStatus === "confirmed"
        ? "confirmed"
        : newStatus === "declined"
          ? "declined"
          : "requested a reschedule for";

    const type =
      newStatus === "confirmed"
        ? "date-accepted"
        : newStatus === "declined"
          ? "date-declined"
          : "date-rescheduled";

    const receiverNotification = {
      userId: currentUser?.userid === receiverId ? senderId : receiverId,
      message: `${currentUser?.name} ${actionText} your date invite!`,
      type,
      dateId,
    };

    const senderNotification = {
      userId: currentUser?.userid,
      message: `You just ${actionText} a date invite.`,
      type,
      dateId,
    };

    await Promise.all([
      addNotification(receiverNotification),
      addNotification(senderNotification),
    ]);

    console.log(
      dateData,
      "datedaata",
      currentUser,
     convertFirestoreDate(dateData.date),
     convertFirestoreDate(dateData.date).toDateString(),
      "datta",
    );

    // await sendEmailNotification({
    //   toEmail: dateData.receiverEmail,
    //   toName: dateData.sentTo,
    //   fromName: currentUser?.name,
    //   fromEmail: currentUser?.email,
    //   date: convertFirestoreDate(dateData.date).toDateString(),
    //   time: dateData.time,
    //   location: dateData.location,
    // });
  };

  const acceptDate = async (dateId: string) => {
    await updateDateStatus(dateId, "confirmed");
  };
  const declineDate = async (dateId: string) => {
    await updateDateStatus(dateId, "declined");
  };

  const rescheduleDate = async (dateId: string) => {
    await updateDateStatus(dateId, "reschedule");
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
        delivered: false,
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

      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          const docRef = change.doc.ref;
          const notification = change.doc.data();

          if (!notification.delivered) {
            showToast(notification);

            await updateDoc(docRef, {
              delivered: true,
            });
          }
        }
      });

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
    acceptDate,
    declineDate,
    rescheduleDate,
  };
};
