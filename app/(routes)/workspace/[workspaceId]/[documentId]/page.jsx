"use client";

import React from 'react'
import SideBar from '../../_components/SideBar'
import DocumentEditor from '../../_components/DocumentEditor';

const WorkspaceDocument = ({params}) => {

  return (
    <div>
  
      <div className=''>
        <SideBar params={params}/>
      </div>

      <div className='md:ml-72'>
        <DocumentEditor params={params}/>
      </div>
    </div>
  )
}

export default WorkspaceDocument