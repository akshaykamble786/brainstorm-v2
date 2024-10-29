"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import WorkspaceLoader from "./(routes)/workspace/_components/WorkspaceLoader";
import LiveCursorProvider from "@/components/ui/LiveCursorProvider";

export function Room({ children, params }) {
  return (
    <LiveblocksProvider
      throttle={32}
      authEndpoint={"/api/liveblocks-auth?roomId=" + params?.documentId}
      resolveUsers={async ({ userIds }) => {
        const q = query(collection(db, 'users'), where('email', 'in', userIds))
        const querySnapshot = await getDocs(q);
        const userList = [];

        querySnapshot.forEach((doc) => {
          userList.push(doc.data())
        });
        return userList;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const q = query(collection(db, 'users'), where('email', '!=', null))
        const querySnapshot = await getDocs(q);
        let userList = [];

        querySnapshot.forEach((doc) => {
          userList.push(doc.data())
        });

        if (text) {
          userList = userList.filter((user) => user.name.includes(text));
        }

        return userList.map((user) => user.id);
      }}
    >
      <RoomProvider
        id={params?.documentId ? params?.documentId : '1'}
        initialPresence={{
          cursor: null
        }}
      >
        <ClientSideSuspense fallback={<div className="h-96 w-96 flex items-center justify-center"><WorkspaceLoader className="m-96 animate-pulse flex justify-center items-center" /></div>}>
          <LiveCursorProvider>
            {children}
          </LiveCursorProvider>
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}