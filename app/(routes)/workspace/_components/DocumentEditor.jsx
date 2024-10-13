import React, { useState } from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";
import RichTextEditor from "./RichTextEditor";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import CommentSection from "./CommentSection";

const DocumentEditor = ({ params }) => {
    const [openComment, setOpenComment] = useState(false);

    return (
        <div className="relative">
            {/* Header */}
            <DocumentHeader />
            <DocumentInfo params={params} />
            {/* rich text editor */}
            <div className="grid grid-cols-4">

                <div className="col-span-3">
                    <RichTextEditor params={params} />
                </div>

                <div className="fixed right-5 bottom-5">
                    <Button onClick={() => setOpenComment(!openComment)}>
                        {openComment ? <X className="z-100"/> : <MessageCircle />}
                    </Button>
                    {openComment && <CommentSection />}
                </div>
            </div>

        </div>
    )
}

export default DocumentEditor