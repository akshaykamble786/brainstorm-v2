"use client";

import Logo from '@/components/global/Logo'
import { OrganizationSwitcher, useAuth, UserButton } from '@clerk/nextjs'
import React from 'react'
import { ModeToggle } from './ModeToggle';

const Header = () => {
  const { orgId } = useAuth();
  
  return (
    <div className='flex items-center justify-around p-4 shadow dark:shadow-gray-800 shadow-gray-300'>
        <Logo/>
        <OrganizationSwitcher 
        afterCreateOrganizationUrl='/dashboard'
        afterLeaveOrganizationUrl='/dashboard' 
        />

        <ModeToggle/>
        <UserButton/>    
    </div>
  )
}

export default Header