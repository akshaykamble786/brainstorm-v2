import { Link2Icon, MoreVertical, Settings2 } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const WorkspaceOptions = ({ workspace }) => {
    if (!workspace || typeof workspace !== 'object') {
        console.error('Invalid workspace prop:', workspace);
        return null;
    }

    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showManageDialog, setShowManageDialog] = useState(false)
    const [workspaceData, setWorkspaceData] = useState({
        workspaceName: workspace.name || "",
        emoji: workspace.emoji || "📁",
        isPublic: workspace.isPublic || false
    })

    const router = useRouter()
    const { toast } = useToast()

    const openManageDialog = (e) => {
        e.stopPropagation()
        setWorkspaceData({
            workspaceName: workspace.name || "",
            emoji: workspace.emoji || "📁",
            isPublic: workspace.isPublic || false
        })
        setShowManageDialog(true)
    }

    const handleUpdateWorkspace = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!workspace.id) {
            console.error('No workspace ID available')
            return
        }

        setIsLoading(true)
        try {
            const workspaceRef = doc(db, 'workspaces', workspace.id.toString())
            await updateDoc(workspaceRef, {
                workspaceName: workspaceData.workspaceName,
                emoji: workspaceData.emoji,
                isPublic: workspaceData.isPublic
            })

            toast({
                title: "Success",
                variant: "success",
                description: "Workspace updated successfully"
            })
            setShowManageDialog(false)
            router.refresh()
        } catch (error) {
            console.error("Error updating workspace:", error)
            toast({
                title: "Error",
                description: "Failed to update workspace",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVertical className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="gap-2 flex">
                        <Link2Icon className="size-4" /> Share Link
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="gap-2 flex"
                        onClick={openManageDialog}
                    >
                        <Settings2 className="size-4" /> Manage workspace
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog
                open={showManageDialog}
                onOpenChange={(open) => {
                    if (!open) setShowManageDialog(false)
                }}
            >
                <DialogContent onClick={(e) => e.stopPropagation()}>
                    <DialogHeader>
                        <DialogTitle>Manage Workspace</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateWorkspace}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Workspace Name</Label>
                                <Input
                                    value={workspaceData.workspaceName}
                                    onChange={(e) => {
                                        e.stopPropagation()
                                        setWorkspaceData(prev => ({
                                            ...prev,
                                            workspaceName: e.target.value
                                        }))
                                    }}
                                    placeholder="Enter workspace name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Emoji</Label>
                                <Input
                                    value={workspaceData.emoji}
                                    onChange={(e) => {
                                        e.stopPropagation()
                                        setWorkspaceData(prev => ({
                                            ...prev,
                                            emoji: e.target.value
                                        }))
                                    }}
                                    placeholder="Enter emoji"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Visibility</Label>
                                <Select
                                    value={workspaceData.isPublic.toString()}
                                    onValueChange={(value) => {
                                        setWorkspaceData(prev => ({
                                            ...prev,
                                            isPublic: value === "true"
                                        }))
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="false">Private</SelectItem>
                                        <SelectItem value="true">Public</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setShowManageDialog(false)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                            >
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* <AlertDialog
                open={isDeleteAlertOpen}
                onOpenChange={setIsDeleteAlertOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            workspace and all of its documents.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteWorkspace}
                            disabled={isLoading}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}
        </div>
    )
}

export default WorkspaceOptions