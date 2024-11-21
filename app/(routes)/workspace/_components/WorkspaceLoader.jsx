import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const WorkspaceLoader = () => {
  return (
      <div className="flex min-h-screen bg-slate-950">

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header Image */}
          <Skeleton className="w-full h-48 rounded-lg mb-8" />

          {/* Title Section */}
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-48" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-10 w-32 rounded-md" />
            ))}
          </div>

          {/* Content Area */}
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
  )
}

export default WorkspaceLoader
