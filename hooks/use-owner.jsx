import { db } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const useOwner = () => {
  const { user } = useUser();
  const room = useRoom();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomDocRef = doc(db, "documents", room.id);
        const roomDoc = await getDoc(roomDocRef);
        if (roomDoc.exists()) {
          const roomData = roomDoc.data();
          const isRoomOwner = roomData.createdBy === user?.emailAddresses[0].toString();
          setIsOwner(isRoomOwner);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    if (room.id) {
      fetchRoomData();
    }
  }, [room.id, user?.emailAddresses]);

  return isOwner;
};

export default useOwner;