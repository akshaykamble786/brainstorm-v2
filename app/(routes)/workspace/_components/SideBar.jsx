"use client";

import Logo from "@/components/global/Logo";
import { Button } from "@/components/ui/button";
import { db } from "@/config/FirebaseConfig";
import { collection, doc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { Bell, Loader2Icon, LogOutIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import DocumentList from "./DocumentList";
import { useAuth, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { ModeToggle } from "../../dashboard/_components/ModeToggle";
import Diamond from "../../../../public/icons/diamond.svg"
import Image from "next/image";

const MAX_FILE = process.env.NEXT_PUBLIC_MAX_FILE_COUNT;

const SideBar = ({ params }) => {
    const [documentList, setDocumentList] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useUser();
    const router = useRouter();
    const { toast } = useToast()

    useEffect(() => {
        params && GetDocumentList();
    }, [params])

    const GetDocumentList = () => {
        const q = query(collection(db, 'workspaceDocuments'), where('workspaceId', '==', Number(params?.workspaceId)));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setDocumentList([]);
            querySnapshot.forEach((doc) => {
                setDocumentList(documentList => [...documentList, doc.data()])
            })
        })
    }

    const CreateNewDocument = async () => {

        if (documentList?.length >= MAX_FILE) {
            toast({
                title: "Upgrade to Pro Plan",
                description: "You reach max file limit, upgrade for unlimited file creation",
                action: <ToastAction altText="Try again">Upgrade</ToastAction>,
            })
            return;
        }

        setLoading(true);
        const docId = crypto.randomUUID();
        await setDoc(doc(db, 'workspaceDocuments', docId.toString()), {
            workspaceId: Number(params?.workspaceId),
            createdBy: user?.primaryEmailAddress?.emailAddress,
            coverImage: null,
            emoji: null,
            id: docId,
            documentName: "Untitled Document",
            documentOutput: []
        });

        await setDoc(doc(db, 'documentOutput', docId.toString()), {
            docId: docId,
            output: []
        })

        setLoading(false);
        router.replace("/workspace/" + params?.workspaceId + "/" + docId);
    }

    return (
        <div className="h-screen md:w-72 hidden md:block fixed p-5 shadow-lg border-r border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-5">
                <Logo />
                <Bell className="size-5 text-gray-500 cursor-pointer" />
            </div>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <Image src={Diamond} height={18} width={18} alt="diamond icon" />
                    <h2 className="text-sm font-light dark:opacity-50 ml-2">Free Plan</h2>
                </div>
                <h2 className="text-sm font-light">
                    <strong>{documentList?.length}</strong> out of <strong>5</strong> files used
                </h2>
            </div>
            <Progress value={(documentList?.length / MAX_FILE) * 100} className="h-2 w-64 rounded-3xl" />

            <hr className="my-4"></hr>

            <div className="flex justify-between items-center">
                <h2>Test Workspace</h2>
                <Button size="sm" onClick={CreateNewDocument}>
                    {loading ? <Loader2Icon className="size-4 animate-spin" /> : "+"}
                </Button>
            </div>

            <DocumentList documentList={documentList} params={params} />

            <div className="border flex justify-between items-center border-gray-800 rounded-xl absolute bottom-2 w-[90%] py-2 px-2">
                <div className="flex gap-3">
                    <UserButton />
                    <div className="flex-col gap-4">
                        <h2 className="text-sm dark:opacity-50">Free Plan</h2>
                        <h2 className="text-xs">{user?.fullName}</h2>
                    </div>
                </div>
                <div className="flex justify-end items-center gap-2">
                    <LogOutIcon onClick={() => signOut()} />
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}

export default SideBar;