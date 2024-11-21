import { Heart, Link2Icon, MoreVertical, PenBox, Trash2 } from 'lucide-react'
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useFavorites } from '@/hooks/use-favorites';
import { useToast } from "@/hooks/use-toast"

const DocumentOptions = ({doc, deleteDocument, workspaceId}) => {
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const { toast } = useToast();

    const handleFavoriteToggle = () => {
        const favoriteDoc = {
            id: doc.id,
            workspaceId: workspaceId,
            name: doc.name,
            emoji: doc.emoji,
            url: `/workspace/${workspaceId}/${doc.id}`
        };

        if (isFavorite(doc.id)) {
            removeFromFavorites(doc.id);
            toast({
                title: "Removed from Favorites",
                description: `${doc.name} has been removed from favorites`,
                variant: "default"
            });
        } else {
            addToFavorites(favoriteDoc);
            toast({
                title: "Added to Favorites",
                description: `${doc.name} has been added to favorites`,
                variant: "default"
            });
        }
    };

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
                        <PenBox className='size-4' /> Publish
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        className="gap-2 flex" 
                        onClick={handleFavoriteToggle}
                    >
                        <Heart 
                            className={`size-4 ${isFavorite(doc.id) 
                                ? 'fill-red-500 text-red-500' 
                                : 'text-muted-foreground'}`} 
                        /> 
                        {isFavorite(doc.id) 
                            ? 'Remove from Favorites' 
                            : 'Add to Favorites'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        className="gap-2 flex text-red-500" 
                        onClick={() => deleteDocument(doc?.id)}
                    >
                        <Trash2 className='size-4' /> Move to trash
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default DocumentOptions;