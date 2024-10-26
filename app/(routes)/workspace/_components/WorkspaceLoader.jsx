import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const WorkspaceLoader = () => {
  return (
      <div className="flex min-h-screen bg-slate-950">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-slate-800 bg-slate-950 p-4 flex flex-col">
          {/* Logo Area */}
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-6 w-24" />
          </div>

          {/* Plan Progress */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
          </div>

          {/* Workspace Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-6 rounded-md" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Profile - Now inside sidebar */}
          <div className="mt-auto pt-4 flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>

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
