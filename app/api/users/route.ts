import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Authenticate the request
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userIds = searchParams.getAll("userIds");

    if (!userIds || !Array.isArray(userIds)) {
      return new NextResponse("Missing or invalid userIds", { status: 400 });
    }

    // Fetch user information for each user ID
    const userInfoPromises = userIds.map(async (userId) => {
      try {
        const response = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          return null;
        }

        const user = await response.json();

        return {
          id: user.id,
          name: user.first_name || user.last_name 
            ? `${user.first_name} ${user.last_name}`.trim() 
            : user.username || user.email_addresses[0]?.email_address || '',
          email: user.email_addresses[0]?.email_address || '',
          imageUrl: user.profile_image_url || '',
        };
      } catch {
        return null;
      }
    });

    const userInfo = await Promise.all(userInfoPromises);
    const filteredUserInfo = userInfo.filter(Boolean);

    return NextResponse.json(filteredUserInfo, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Failed to fetch users", { status: 500 });
  }
}