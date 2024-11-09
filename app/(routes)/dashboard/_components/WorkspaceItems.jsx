"use client";

import { db } from '@/config/FirebaseConfig';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function WorkspaceItems({workspaceList}) {
  const router = useRouter();
  const [workspaceDocuments, setWorkspaceDocuments] = useState({});

  useEffect(() => {
    const fetchFirstDocuments = async () => {
      const documents = {};
      
      for (const workspace of workspaceList) {
        const q = query(
          collection(db, 'documents'),
          where('workspaceId', '==', workspace.id),
          limit(1)
        );

        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            documents[workspace.id] = querySnapshot.docs[0].data().id;
          }
        } catch (error) {
          console.error('Error fetching document for workspace:', workspace.id, error);
        }
      }
      
      setWorkspaceDocuments(documents);
    };

    if (workspaceList?.length > 0) {
      fetchFirstDocuments();
    }
  }, [workspaceList]);

  const OnClickWorkspaceItem = (workspaceId) => {
    const documentId = workspaceDocuments[workspaceId];
    if (documentId) {
      router.push(`/workspace/${workspaceId}/${documentId}`);
    } else {
      router.push(`/workspace/${workspaceId}/new`); 
    }
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
        {workspaceList && workspaceList.map((workspace, index)=>(
            <div key={workspace.id} className='border shadow-xl rounded-xl
            hover:scale-105 transition-all cursor-pointer'
            onClick={()=>OnClickWorkspaceItem(workspace.id)}
            >
                <Image src={workspace?.coverImage} 
                width={400} height={200} alt='cover'
                className='h-[150px] object-cover rounded-t-xl'
                />
                <div className='p-4 rounded-b-xl'>
                    <h2 className='flex gap-2'>{workspace?.emoji} {workspace.workspaceName}</h2>
                </div>
            </div>
        ))}
    </div>
  )
}

export default WorkspaceItems