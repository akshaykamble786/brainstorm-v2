import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SK,
});

export async function POST(request) {
  const user = await currentUser();

  const session = liveblocks.prepareSession(
    user?.primaryEmailAddress?.emailAddress,
  );

  const { room } = await request.json();
  const {searchParams}=new URL(request?.url);
  const roomId = searchParams.get('roomId');
  console.log("Room",roomId);
  session.allow(roomId, session?.FULL_ACCESS)
  
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
