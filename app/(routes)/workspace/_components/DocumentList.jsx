import Image from "next/image";
import React, { useEffect } from "react";

const DocumentList = ({ documentList, params }) => {
    return (
        <>
            {documentList.map((doc, index) => (
                <div 
                    key={index} 
                    className={`mt-3 p-2 px-3 rounded-lg cursor-pointer ${doc.id === String(params?.documentId) ? 'bg-gray-800' : ''}`}
                >                    <div className="flex gap-2 items-center">
                        {!doc.emoji && <Image src={'/loopdocument.svg'} width={20} height={20} />}
                        <h2 className="flex gap-2">{doc?.emoji}{doc.documentName}
                        </h2>
                    </div>
                </div>
            ))}
        </>
    )
}

export default DocumentList;