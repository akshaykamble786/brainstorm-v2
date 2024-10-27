"use client";

import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { AlignLeft, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import WorkspaceItems from './WorkspaceItems';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';

const WorkspaceList = () => {
    const { user } = useUser();
    const  { orgId } = useAuth();
    const [workspaceList, setWorkspaceList] = useState([]);

    useEffect(()=>{
        user && getWorkspaceList();
    },[orgId, user])

    const getWorkspaceList = async () => {
        setWorkspaceList([]);
        const q = query(collection(db,'Workspace'), where('orgId','==',orgId ? orgId : user?.primaryEmailAddress?.emailAddress));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc)=>{
            setWorkspaceList(prev=>[...prev,doc.data()])
        })
    }

    return (
        <div className='my-10 p-10 md:px-24 lg:px-36 xl:px-52'>
            <div className='flex justify-between'>
                <h2 className='font-bold text-2xl'>Welcome, {user?.firstName}</h2>
                <Link href={'/createworkspace'}>
                    <Button>+</Button>
                </Link>
            </div>

            <div className='mt-10 flex justify-between'>
                <div className=''>
                    <h2 className='font-medium text-primary'>Workspaces</h2>
                </div>
            </div>

            {workspaceList?.length == 0 ?
                <div className='flex flex-col justify-center items-center my-10'>
                    <Image src={'/workspace.png'} width={200} height={200} alt='workspace' />
                    <h2>Craete a new workspace</h2>
                    <Link href={'/createworkspace'}>
                        <Button variant="outline" className="my-3">+ New Workspace</Button>
                    </Link>
                </div>
                :
                <WorkspaceItems workspaceList={workspaceList}/>
            }
        </div>
    )
}

export default WorkspaceList