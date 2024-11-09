"use client";

import CoverPicker from '@/app/_components/CoverPicker';
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { db } from '@/config/FirebaseConfig';
import { toast } from '@/hooks/use-toast';
import { useAuth, useUser } from '@clerk/nextjs';
import { doc, setDoc } from 'firebase/firestore';
import { Loader2Icon, SmilePlus } from 'lucide-react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const MAX_WORKSPACE = process.env.NEXT_PUBLIC_MAX_WORKSPACE_COUNT;

const CreateWorkspace = () => {

  const [coverImage, setCoverImage] = useState('/cover.png');
  const [workspaceName, setWorkspaceName] = useState("");
  const [emoji, setEmoji] = useState();
  const [loading, setLoading] = useState();

  const { user } = useUser();
  const { orgId } = useAuth();
  
  const router = useRouter();

  const OnCreateWorkspace = async () => { 
    
    setLoading(true);
    const workspaceId = Date.now();
    const result = await setDoc(doc(db,'workspaces', workspaceId.toString()),{
        workspaceName : workspaceName,
        emoji : emoji,
        coverImage : coverImage,
        createdBy : user?.primaryEmailAddress?.emailAddress,
        createdAt : new Date(),
        id : workspaceId,
        orgId : orgId ? orgId : user?.primaryEmailAddress?.emailAddress
    });

    const docId = crypto.randomUUID();
    await setDoc(doc(db,'documents',docId.toString()),{
      workspaceId : workspaceId,
      createdBy : user?.primaryEmailAddress?.emailAddress,
      createdAt : new Date(),
      coverImage : null,
      emoji : null,
      id: docId,
      documentName : "Untitled Document",
    });

    await setDoc(doc(db,'documentOutput',docId.toString()),{
      docId: docId,
      output : []
    })

    setLoading(false);
    router.replace("/workspace/"+workspaceId+"/"+docId);
  }

  return (
    <div className='px-10 md:px-36 lg:px-52 xl:px-80 py-14'>
      <div className='shadow-2xl rounded-xl dark:border border-gray-800'>

        <CoverPicker setNewCover={(v) => setCoverImage(v)}>
          <div className='relative group cursor-pointer'>
            <h2 className='hidden absolute p-4 w-full h-full items-center justify-center group-hover:flex'>
              Change Cover
            </h2>
            <div className='group-hover:opacity-40'>
              <Image src={coverImage} width={400} height={400} className='w-full h-[180px] object-cover rounded-t-xl' alt='cover image' />
            </div>
          </div>
        </CoverPicker>

        <div className='p-12'>
          <h2 className='font-normal text-xl'>Create a new workspace</h2>
          <h2 className='font-normal text-sm mt-2'>This is a shared space where you can collaborate with your colleagues and friends. You can always rename it later</h2>

          <div className='mt-6 flex gap-2 items-center'>
            <EmojiPickerComponent setEmojiIcon={(v)=>setEmoji(v)}>
              <Button variant="outline">
                {emoji ? emoji :
                  <SmilePlus />
                }
              </Button>
            </EmojiPickerComponent>
            <Input placeholder="Workspace name" onChange={(e) => { setWorkspaceName(e.target.value) }} />
          </div>

          <div className="mt-7 flex justify-end gap-6">
            <Button disabled={!workspaceName?.length || loading} className="text-sm" onClick={OnCreateWorkspace}>
              Create {loading && <Loader2Icon className='animate-spin ml-2'/>}
            </Button>
            <Button variant="outline" className="text-sm">Cancel</Button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreateWorkspace