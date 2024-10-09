import React from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";

const DocumentEditor = ({params}) => {
    return (
        <div>
            {/* Header */}
            <DocumentHeader />
            <DocumentInfo params={params} />
            {/* rich text editor */}
        </div>
    )
}

export default DocumentEditor