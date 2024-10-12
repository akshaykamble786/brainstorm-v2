import React from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";
import RichTextEditor from "./RichTextEditor";

const DocumentEditor = ({params}) => {
    return (
        <div>
            {/* Header */}
            <DocumentHeader />
            <DocumentInfo params={params} />
            {/* rich text editor */}
            <RichTextEditor params={params}/>
        </div>
    )
}

export default DocumentEditor