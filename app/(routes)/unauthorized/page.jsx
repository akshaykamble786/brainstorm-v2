"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-gray-600 text-center mb-8">
        You don't have permission to access this workspace.
      </p>
      <Button onClick={() => router.push('/')}>
        Return to Home
      </Button>
    </div>
  );
}