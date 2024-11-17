"use client";

import React from 'react'
import DocumentEditor from '../../_components/DocumentEditor';
import { Room } from '@/app/Room';

const WorkspaceDocument = ({ params }) => {
  return (
    <Room params={params}>
      <div className="h-full">
        <DocumentEditor params={params} />
      </div>
    </Room>
  );
}

export default WorkspaceDocument