import {
  db,
  doc,
  setDoc,
  getDoc,
  or,
  limit,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "@/services/firebase";
import { useStore } from "@/store/Store";
import type { MailSchemaType } from "@/schema/dashboard";
import { useMoments } from "./useMoments";
import { toast } from "react-toastify";

export const useMails = () => {
  const { currentUser, setMails } = useStore();
  const { convertFirestoreDate, addNotification } = useMoments();
  const composeMail = async (payload: MailSchemaType, styleId: number) => {
    try {
      // The random document id doubles as the unguessable share id, so rules can
      // allow opening one letter by link without allowing letters to be listed.
      const mailRef = doc(collection(db, "mails"));
      const sharedId = mailRef.id;

      let recipientUserId = "";
      let recipientUsername = "";

      if (payload.username) {
        const usersRef = collection(db, "user");
        const q = query(usersRef, where("name", "==", payload.username), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];

          recipientUserId = userDoc.id; // ✅ correct
          recipientUsername = userDoc.data().name;
        } else {
          console.log(`Username "${payload.username}" not found on Moments.`);
          toast.info(
            "Username not found on moments, copy link or create a new mail with the right username ",
          );
        }
      }

      const data = {
        subject: payload.subject,
        to: payload.to,
        message: payload.message,
        styleId,
        senderUserId: currentUser?.userid,
        senderUsername: currentUser?.name,
        recipientUserId,
        recipientUsername,
        createdAt: new Date(),
        sharedId,
        id: mailRef.id,
        isRead: false,
      };

      await setDoc(mailRef, data);

      if (recipientUserId) {
        const notification = {
          userId: recipientUserId,
          message: `${currentUser?.name} sent you a letter`,
          type: "mail",
          dateId: mailRef.id,
          createdAt: new Date(),
        };

        await addNotification(notification);
      }

      return {
        sharedId,
        id: mailRef.id,
      };
    } catch (error) {
      throw error;
    }
  };
  const fetchMailBySharedId = async (sharedId: string) => {
    try {
      const snapshot = await getDoc(doc(db, "mails", sharedId));
      let docData = snapshot.data();

      if (!docData) {
        // Links shared before the document id became the share id.
        const legacy = await getDocs(
          query(
            collection(db, "mails"),
            where("sharedId", "==", sharedId),
            limit(1),
          ),
        ).catch(() => null);
        docData = legacy?.docs[0]?.data();
      }

      if (!docData) {
        throw new Error("Letter not found");
      }

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

  const fetchMails = () => {
    const q = query(
      collection(db, "mails"),
      or(
        where("senderUserId", "==", currentUser?.userid),
        where("recipientUserId", "==", currentUser?.userid),
      ),
    );

    return onSnapshot(q, (querySnapshot) => {
      const data: any[] = [];

      querySnapshot.forEach((doc) => {
        const item = doc.data();

        data.push({
          ...item,
          id: doc.id,

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
