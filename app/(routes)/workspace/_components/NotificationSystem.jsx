"use client";

import React, { useEffect } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
    useInboxNotifications, useDeleteAllInboxNotifications,
    useMarkAllInboxNotificationsAsRead, useUnreadInboxNotificationsCount, useUpdateRoomNotificationSettings
} from "@liveblocks/react/suspense";
import {
    InboxNotification,
    InboxNotificationList,
} from "@liveblocks/react-ui";

const NotificationSystem = ({ children }) => {
    const { inboxNotifications } = useInboxNotifications();
    const { count, error, isLoading } = useUnreadInboxNotificationsCount();
    const updateRoomNotificationSettings = useUpdateRoomNotificationSettings();
    const markAllInboxNotificationsAsRead = useMarkAllInboxNotificationsAsRead();
    const deleteAllInboxNotifications = useDeleteAllInboxNotifications();

    useEffect(() => {
        updateRoomNotificationSettings({ threads: "all" })
    }, [count])

    return (
        <Popover>
            <PopoverTrigger>
                <div className='flex gap-1 relative'>
                    {children}
                    <span className='absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-primary text-white aspect-square rounded-full text-xs'>{count}</span>
                </div>
            </PopoverTrigger>
            <PopoverContent className={"w-[500px]"}>
                <InboxNotificationList className='bg-background text-foreground'>
                    <div className="sticky top-0 z-10 flex place-items-center justify-between bg-background w-full p-2 pl-4">
                        <h1 className="font-bold text-xl">Notifications</h1>
                        <div className="flex gap-6">
                            <Button
                                className="default"
                                onClick={markAllInboxNotificationsAsRead}
                            >
                                Mark all as read
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={deleteAllInboxNotifications}
                            >
                                Delete all
                            </Button>
                        </div>
                    </div>
                    {inboxNotifications.length === 0 && (
                        <div className='bg-background text-foreground p-6'>
                            There aren't any notifications yet.
                        </div>
                    )}
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