import { db } from '@/config/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export async function checkWorkspaceAccess(workspaceId, userEmail) {
  try {
    if (!userEmail) return false;

    const workspaceRef = doc(db, 'workspaces', workspaceId);
    const workspaceSnap = await getDoc(workspaceRef);

    if (!workspaceSnap.exists()) return false;

    const workspaceData = workspaceSnap.data();

    return (
      workspaceData.createdBy === userEmail ||
      workspaceData.isPublic ||
      (workspaceData.collaborators && workspaceData.collaborators.includes(userEmail))
    );
  } catch (error) {
    console.error('Error checking workspace access:', error);
    return false;
  }
}