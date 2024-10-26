"use client";

import Logo from '@/components/global/Logo'
import { OrganizationSwitcher, useAuth, UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { ModeToggle } from './ModeToggle';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';

const Header = () => {
  const { orgId } = useAuth();
  const { user } = useUser();

  
  useEffect(()=>{
    user && saveUserData();
  },[user])

  const saveUserData = async () => {
    const docId = user?.primaryEmailAddress?.emailAddress
    try {
      await setDoc(doc(db,'users',docId), {
        name: user?.fullName,
        avatar: user?.imageUrl,
        email: user?.primaryEmailAddress?.emailAddress
      })
    } catch (e) {
      console.log("user not saved")
    }
  }

  return (
    <div className='flex items-center justify-around p-4 shadow dark:shadow-gray-800 shadow-gray-300'>
      <Logo />
      <OrganizationSwitcher
        afterCreateOrganizationUrl={'/dashboard'}
        afterLeaveOrganizationUrl={'/dashboard'}
      />

      <ModeToggle />
      <UserButton />
    </div>
  )
}

export default Header