"use client";

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { checkWorkspaceAccess } from '../../../../../lib/workspaceAccess'
import DocumentEditor from '../../_components/DocumentEditor';
import { Room } from '@/app/Room';

export default function WorkspaceDocument({ params }) {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAccess() {
      if (!user) return;

      const hasAccess = await checkWorkspaceAccess(
        params.workspaceId,
        user.primaryEmailAddress?.emailAddress
      );

      if (!hasAccess) {
        router.push('/unauthorized');
      }
      setLoading(false);
    }

    checkAccess();
  }, [user, params.workspaceId, router]);

  if (loading) {
    return <div>Loading...</div>; // Add your loading component
  }

  return (
    <Room params={params}>
      <div className="h-full">
        <DocumentEditor params={params} />
      </div>
    </Room>
  );
}