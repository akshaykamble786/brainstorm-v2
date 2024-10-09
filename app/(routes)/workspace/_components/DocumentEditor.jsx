import React from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";

const DocumentEditor = () => {
    return (
        <div>
            {/* Header */}
            <DocumentHeader />
            <DocumentInfo />
            {/* rich text editor */}
        </div>
    )
}

export default DocumentEditor