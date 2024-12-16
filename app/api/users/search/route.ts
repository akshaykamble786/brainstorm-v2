import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * Returns a list of user IDs from a partial search input
 * For `resolveMentionSuggestions` in liveblocks.config.ts
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate the request
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text") || "";

    // Fetch users from Clerk and filter by name
    const response = await fetch(
      `https://api.clerk.com/v1/users?query=${encodeURIComponent(text)}&limit=10`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const users = await response.json();

    // Map to user IDs
    const filteredUserIds = users
      .map((user: any) => user.id)
      .filter(Boolean);

    return NextResponse.json(filteredUserIds);
  } catch (error) {
    console.error("Error searching users:", error);
    return new NextResponse("Failed to search users", { status: 500 });
  }
}
