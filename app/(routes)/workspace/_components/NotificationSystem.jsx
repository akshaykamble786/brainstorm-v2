"use client";

import React, { useEffect } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useInboxNotifications, useUnreadInboxNotificationsCount, useUpdateRoomNotificationSettings } from "@liveblocks/react/suspense";
import {
  InboxNotification,
  InboxNotificationList,
} from "@liveblocks/react-ui";


const NotificationSystem = ({ children }) => {
    const { inboxNotifications } = useInboxNotifications();
    const { count, error, isLoading } = useUnreadInboxNotificationsCount();
    const updateRoomNotificationSettings = useUpdateRoomNotificationSettings();

    useEffect(()=>{
        updateRoomNotificationSettings({threads : "all"})
    },[count])

    return (
        <Popover>
            <PopoverTrigger>
                <div className='flex gap-1 relative'>
                {children}
                <span className='absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-primary text-white aspect-square rounded-full text-xs'>{count}</span>
                </div>
            </PopoverTrigger>
            <PopoverContent className={"w-[500px]"}>
                <InboxNotificationList>
                    {inboxNotifications.map((inboxNotification) => (
                        <InboxNotification
                            key={inboxNotification.id}
                            inboxNotification={inboxNotification}
                        />
                    ))}
                </InboxNotificationList>
            </PopoverContent>
        </Popover>
    )
}

export default NotificationSystem