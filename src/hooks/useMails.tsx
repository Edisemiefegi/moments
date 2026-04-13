import {
  db,
  addDoc,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
  onSnapshot,
} from "@/services/firebase";
import { useStore } from "@/store/Store";
import type { MailSchemaType } from "@/schema/dashboard";
import { useMoments } from "./useMoments";

export const useMails = () => {
  const { currentUser, setMails } = useStore();
  const { convertFirestoreDate } = useMoments();
  const composeMail = async (payload: MailSchemaType, styleId: number) => {
    try {
      const sharedId = Math.random().toString(36).substring(2, 10);
      const data = {
        subject: payload.subject,
        to: payload.to,
        message: payload.message,
        styleId: styleId,
        senderUserId: currentUser?.userid,
        senderUsername: currentUser?.name,
        recipientUserId: "",
        recipientUsername: "",
        createdAt: new Date(),
        sharedId,
        id: "",
        isRead: false,
      };

      if (payload.username) {
        const usersRef = collection(db, "user");
        const q = query(usersRef, where("name", "==", payload.username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const recipientUserDoc = querySnapshot.docs[0];
          data.recipientUserId = recipientUserDoc.id;
          data.recipientUsername = recipientUserDoc.data().name;
        } else {
          console.log(
            `Username "${payload.username}" not found on Moments. The letter will not be delivered to a Moments inbox.`,
          );
        }
      }

      const mailRef = await addDoc(collection(db, "mails"), data);

      await updateDoc(mailRef, {
        id: mailRef.id,
      });

      return {
        sharedId,
      };
    } catch (error) {}
  };

  const fetchMailBySharedId = async (sharedId: string) => {
    try {
      const mailsRef = collection(db, "mails");
      const q = query(mailsRef, where("sharedId", "==", sharedId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Letter not found");
      }

      const docData = querySnapshot.docs[0].data();

      return {
        subject: docData.subject,
        to: docData.to,
        message: docData.message,
        styleId: docData.styleId,
        senderUsername: docData.senderUsername,
      };
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch letter");
    }
  };

  const fetchMails = async () => {
    const q = query(collection(db, "mails"));

    onSnapshot(q, (querySnapshot) => {
      const data: any[] = [];

      querySnapshot.forEach((doc) => {
        const item = doc.data();

        data.push({
          ...item,

          createdAt: convertFirestoreDate(item.createdAt),
        });
      });

      data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      setMails(data);
    });
  };

  const fetchCreatedMails = async () => {
    const mailsRef = collection(db, "mails");

    const q = query(mailsRef, where("senderUserId", "==", currentUser?.userid));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  const fetchUnreadMails = async () => {
    const mailsRef = collection(db, "mails");

    const q = query(
      mailsRef,
      where("recipientUserId", "==", currentUser?.userid),
      where("isRead", "==", false),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };
  return {
    composeMail,
    fetchMailBySharedId,
    fetchMails,
    fetchCreatedMails,
    fetchUnreadMails,
  };
};
