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
  console.log("RoomProvider initialized with id:", params?.documentId);
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

        console.log('User list before filtering:', userList);

        if (text) {
          userList = userList.filter((user) => {
            if (user.name && typeof user.name === 'string') {
              console.log('Checking user name:', user.name);
              return user.name.includes(text);
            } else {
              console.warn('User with invalid name:', user);
              return false;
            }
          });
        }

        console.log('User list after filtering:', userList);

        return userList.map((user) => user.id);
      }}
    >
      <RoomProvider
        id={params?.documentId ? params?.documentId : '1'}
        initialPresence={{
          cursor: null
        }}
      >
        <ClientSideSuspense fallback={<WorkspaceLoader className="animate-pulse"/>}>
          <LiveCursorProvider>
            {children}
          </LiveCursorProvider>
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}