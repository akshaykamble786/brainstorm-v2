import { Link2Icon, MoreVertical, PenBox, Trash2 } from 'lucide-react'
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DocumentOptions = ({doc, deleteDocument}) => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVertical className='size-4' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="gap-2 flex">
                        <Link2Icon className='size-4' /> Share Link
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 flex">
                        <PenBox className='size-4' /> Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 flex text-red-500" onClick={() => deleteDocument(doc?.id)}>
                        <Trash2 className='size-4' /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default DocumentOptions