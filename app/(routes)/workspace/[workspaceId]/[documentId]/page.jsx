"use client";

import React from 'react'
import SideBar from '../../_components/SideBar'

const WorkspaceDocument = ({params}) => {

  return (
    <div>
  
      <div className=''>
        <SideBar params={params}/>
      </div>

      <div className='md:ml-72'>
        
      </div>
    </div>
  )
}

export default WorkspaceDocument