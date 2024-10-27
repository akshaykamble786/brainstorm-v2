import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';


const InviteCollaborator = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [userQuery, setUserQuery] = useState("");

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleChatSubmit();
        }
      };
    
    return (
        <>
            <Button
                variant="default"
                className="h-[36px]"
                onClick={() => setOpen(true)}
            >
                Invite
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Invite a Collaborator</DialogTitle>
                        <DialogDescription>
                            Invite other users to collaborate on your documents in real-time
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        placeholder="Invite your friends"
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                        onKeyDown={handleKeyPress}
                        disabled={loading}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={loading} className="min-w-[75px]">
                        {loading ? <Loader2Icon className="animate-spin w-5 h-5" /> : 'Invite'}
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default InviteCollaborator