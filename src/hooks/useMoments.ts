// import { db, doc, setDoc, getDoc } from "@/services/firebase";
import { useStore } from "@/store/Store";
// import type { Timeline } from "@/types";



export const useMoments = () => {
  const {  currentUser } = useStore();

  const addTimeline = async () => {
    console.log(currentUser);
    
  };

  return {
    addTimeline,
  };
};
