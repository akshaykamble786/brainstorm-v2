"use client";

import React from 'react'
import SideBar from '../../_components/SideBar'
import DocumentEditor from '../../_components/DocumentEditor';
import { Room } from '@/app/Room';

const WorkspaceDocument = ({ params }) => {

  return (
    <Room params={params}>
      <div>

        <div className=''>
          <SideBar params={params} />
        </div>

        <div className='md:ml-72'>
          <DocumentEditor params={params} />
        </div>
      </div>
    </Room>
  )
}

export default WorkspaceDocument