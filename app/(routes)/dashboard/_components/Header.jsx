import Logo from '@/components/global/Logo'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between p-3 shadow-sm'>
        <Logo/>
        <UserButton/>    
    </div>
  )
}

export default Header