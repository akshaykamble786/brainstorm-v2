import Image from "next/image";
import React from "react";
import DocLogo from "../../../../public/icons/doclogo.png";
import { useRouter } from "next/navigation";
import DocumentOptions from "./DocumentOptions";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

const DocumentList = ({ documentList, params }) => {
    const router = useRouter();
    const { theme } = useTheme();

    const DeleteDocument = async (docId) => {
        await deleteDoc(doc(db, "documents", docId))
        toast({
            description: "Document deleted",
            variant: "destructive"
        })
    }

    return (
        <>
            {documentList.map((doc, index) => (
                <div
                    key={index}
                    className={`mt-2 py-2 px-1 ${theme === 'light' ? 'border-gray-300' : ''} border hover:bg-gray-300 dark:hover:bg-gray-900 rounded-lg cursor-pointer flex justify-between items-center ${doc.id === String(params?.documentId) ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                    onClick={() => router.push('/workspace/' + params?.workspaceId + "/" + doc.id)}
                >
                    <div className="flex gap-2 items-center">
                        {!doc.emoji && <Image src={DocLogo} width={20} height={20} alt="Doc Logo" />}
                        <h2 className="flex items-center gap-2">
                            <span>{doc?.emoji}</span>
                            <span>{doc.documentName}</span>
                        </h2>
                    </div>

                    <DocumentOptions doc={doc} deleteDocument={(docId) => DeleteDocument(docId)} />
                </div>
            ))}
        </>
    )
}

export default DocumentList;