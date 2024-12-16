import { adminDb } from "@/config/FirebaseAdminConfig";
import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { NextResponse } from "next/server";

export const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SK,
});

export async function POST(request) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { room } = await request.json();
    
    const { searchParams } = new URL(request?.url);
    const roomId = searchParams.get('roomId');
    
    if (!roomId) {
      return NextResponse.json(
        { message: "Room ID is required" },
        { status: 400 }
      );
    }

    const session = liveblocks.prepareSession(
      user.primaryEmailAddress?.emailAddress,
      {
        userInfo: {
          name: user.fullName || "",
          email: user.primaryEmailAddress?.emailAddress || "",
          avatar: user.imageUrl || "",
        }
      }
    );

    const userSnapshot = await adminDb
      .collection("users")
      .doc(user.primaryEmailAddress?.emailAddress)
      .get();

    if (userSnapshot.exists) {
      session.allow(roomId, session.FULL_ACCESS);
      const { status, body } = await session.authorize();
      return new Response(body, { status });
    } else {
      console.log("User not authorized to access the room");
      return NextResponse.json(
        { message: "You are not authorized to access this room" },
        { status: 403 }
      );
    }

  } catch (error) {
    console.error("Error in Liveblocks route:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}