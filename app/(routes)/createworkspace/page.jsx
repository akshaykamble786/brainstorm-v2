"use client";

import CoverPicker from '@/app/_components/CoverPicker';
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SmilePlus } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'

const CreateWorkspace = () => {

  const [coverImage, setCoverImage] = useState('/cover.png');
  const [workspaceName, setWorkspaceName] = useState("");
  const [emoji, setEmoji] = useState();

  return (
    <div className='p-10 md:px-36 lg:px-52 xl:px-80 py-20'>
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
            <Button disabled={!workspaceName?.length} className="text-sm">Create</Button>
            <Button variant="outline" className="text-sm">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateWorkspace