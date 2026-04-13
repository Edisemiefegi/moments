import type { DateSchemaType } from "@/schema/dashboard";
import {
  db,
  addDoc,
  collection,
  updateDoc,
  query,
  where,
  onSnapshot,
  doc,
  getDocs,
  getDoc,
  arrayUnion,
} from "@/services/firebase";
import { useStore } from "@/store/Store";
import { showToast, type DateType } from "@/types";
// import { sendInviteEmailNotification } from "@/services/email";

interface ProposeReschedulePayload {
  proposedDate: Date;
  proposedTime: string;
  rescheduleMessage?: string;
  rescheduleProposerId: string;
}

export const useMoments = () => {
  const { currentUser, setDates, setNotifications } = useStore();

  function convertFirestoreDate(date: any): Date {
    if (!date) return new Date();

    if (date.toDate) {
      return date.toDate();
    }

    return new Date(date);
  }

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
            proposedDate: item.proposedDate
              ? convertFirestoreDate(item.proposedDate)
              : undefined,
            createdAt: convertFirestoreDate(item.createdAt),
          });
        });

        data.sort((a, b) => b.date.getTime() - a.date.getTime());

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

  const proposeReschedule = async (
    dateId: string,
    payload: ProposeReschedulePayload,
  ) => {
    const dateRef = doc(db, "dates", dateId);
    const dateSnap = await getDoc(dateRef);
    const dateData = dateSnap.data() as DateType | undefined;

    if (!dateData) {
      throw new Error("Date not found for reschedule proposal.");
    }

    const otherUserId =
      currentUser?.userid === dateData.receiverId
        ? dateData.senderId
        : dateData.receiverId;

    await updateDoc(dateRef, {
      status: "reschedule-pending",
      proposedDate: payload.proposedDate,
      proposedTime: payload.proposedTime,
      rescheduleMessage: payload.rescheduleMessage || null,
      rescheduleProposerId: payload.rescheduleProposerId,
    });

    await addNotification({
      userId: otherUserId,
      message: `${currentUser?.name} proposed a new time for your date!`,
      type: "date-reschedule-proposed",
      dateId: dateId,
      senderId: currentUser?.userid,
    });
  };

  const respondToReschedule = async (
    dateId: string,
    action: "accept" | "decline",
  ) => {
    const dateRef = doc(db, "dates", dateId);
    const dateSnap = await getDoc(dateRef);
    const dateData = dateSnap.data() as DateType | undefined;

    if (!dateData || dateData.status !== "reschedule-pending") {
      throw new Error(
        "Cannot respond to reschedule: Date not found or not in 'reschedule-pending' status.",
      );
    }

    let updatePayload: any = {
      proposedDate: null,
      proposedTime: null,
      rescheduleMessage: null,
      rescheduleProposerId: null,
    };

    const proposerUserId = dateData.rescheduleProposerId;
    const currentUserName = currentUser?.name || "Someone";

    let notificationMessageToProposer = "";
    let notificationMessageToResponder = "";
    let notificationTypeToProposer = "";
    let notificationTypeToResponder = "";

    if (action === "accept") {
      updatePayload = {
        ...updatePayload,
        date: dateData.proposedDate,
        time: dateData.proposedTime,
        status: "confirmed",
      };
      notificationMessageToProposer = `${currentUserName} accepted your reschedule request!`;
      notificationMessageToResponder = `You accepted the reschedule request.`;
      notificationTypeToProposer = "date-reschedule-accepted";
      notificationTypeToResponder = "date-reschedule-accepted";
    } else {
      updatePayload = {
        ...updatePayload,
        status: "declined",
      };
      notificationMessageToProposer = `${currentUserName} declined your reschedule request.`;
      notificationMessageToResponder = `You declined the reschedule request.`;
      notificationTypeToProposer = "date-reschedule-declined";
      notificationTypeToResponder = "date-reschedule-declined";
    }

    await updateDoc(dateRef, updatePayload);

    if (proposerUserId) {
      await addNotification({
        userId: proposerUserId,
        message: notificationMessageToProposer,
        type: notificationTypeToProposer,
        dateId: dateId,
        senderId: currentUser?.userid,
      });
    }

    await addNotification({
      userId: currentUser?.userid || "",
      message: notificationMessageToResponder,
      type: notificationTypeToResponder,
      dateId: dateId,
      senderId: currentUser?.userid,
    });
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

      data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      setNotifications(data);
    });
  };

  const markNotificationAsRead = async (id: string) => {
    await updateDoc(doc(db, "notifications", id), {
      read: true,
    });
    console.log(id, "djdjd");
  };

  const markDateAsAddedToCalendar = async (dateId: string, userId: string) => {
    try {
      const dateRef = doc(db, "dates", dateId);
      await updateDoc(dateRef, {
        addedToCalendarBy: arrayUnion(userId),
      });
      console.log(
        `Date ${dateId} marked as added to calendar by user ${userId}`,
      );
    } catch (error) {
      console.error("Error marking date as added to calendar:", error);
      throw error;
    }
  };

  return {
    sendDateInvite,
    getAllDates,
    getUserNotifications,
    markNotificationAsRead,
    acceptDate,
    declineDate,
    proposeReschedule,
    respondToReschedule,
    markDateAsAddedToCalendar,
    convertFirestoreDate,
  };
};
