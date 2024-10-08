"use client";

import Logo from "@/components/global/Logo";
import { Button } from "@/components/ui/button";
import { db } from "@/config/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import DocumentList from "./DocumentList";

const SideBar = ({params}) => {
    const [documentList,setDocumentList] = useState([]);

    useEffect(()=>{
        params && GetDocumentList();
    },[params])
    
   const GetDocumentList = () => {
    const q = query(collection(db,'workspaceDocuments'),where('workspaceId','==',Number(params?.workspaceId)));

    const unsubscribe = onSnapshot(q,(querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            setDocumentList(documentList => [...documentList, doc.data()])
        })
    })
   }

    return (
        <div className="h-screen md:w-72 hidden md:block fixed p-5 shadow-lg border-r border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center">
                <Logo />
                <Bell className="size-5 text-gray-500" />
            </div>
            <hr className="my-5"></hr>

            <div className="flex justify-between items-center">
                <h2>Test Workspace</h2>
                <Button size="sm">+</Button>
            </div>

        <DocumentList documentList={documentList} params={params}/>
        </div>
    )
}

export default SideBar;