'use client';

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import FollowPointer from "./FollowPointer";

export default function LiveCursorProvider({children}){
    const [myPresence, setMyPresence] = useMyPresence();
    const others = useOthers();

    const handlePointerMove = (e) => {
        const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY)}
        setMyPresence({cursor})
    }

    const handlePointerLeave = () => {
        setMyPresence({cursor : null})
    }

    return(
        <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        >
            {others.filter((other) => other.presence.cursor !== null)
            .map(({connectionId, presence, info})=>(
                <FollowPointer 
                key={connectionId}
                info={info}
                x={presence.cursor?.x}
                y={presence.cursor?.y}
                />
            ))            
            }
            {children}
        </div>
    )
}