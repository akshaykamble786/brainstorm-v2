import { ChevronRight, Plus } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { collection, doc, getDoc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

const MAX_FILE = process.env.NEXT_PUBLIC_MAX_FILE_COUNT;

export function NavWorkspaces({
  workspaces, params
}) {

  const [documentList, setDocumentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("Loading...");

  const user = useUser();
  const router = useRouter();
  const { toast } = useToast()

  useEffect(() => {
    if (params) {
      GetDocumentList();
      GetWorkspaceName();
    }
  }, [params]);

  const GetWorkspaceName = async () => {
    try {
      const workspaceRef = doc(db, 'workspaces', params?.workspaceId.toString());
      const workspaceSnap = await getDoc(workspaceRef);

      if (workspaceSnap.exists()) {
        setWorkspaceName(workspaceSnap.data().workspaceName);
      } else {
        setWorkspaceName("Untitled Workspace");
      }
    } catch (error) {
      console.error("Error fetching workspace name:", error);
      setWorkspaceName("Error loading workspace");
    }
  };

  const GetDocumentList = () => {
    const q = query(collection(db, 'documents'), where('workspaceId', '==', Number(params?.workspaceId)));

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
        description: "You've reached max file limit, upgrade for unlimited file creation",
        action: <ToastAction altText="Try again">Upgrade</ToastAction>,
      })
      return;
    }

    setLoading(true);
    const docId = crypto.randomUUID();
    await setDoc(doc(db, 'documents', docId.toString()), {
      workspaceId: Number(params?.workspaceId),
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: new Date(),
      coverImage: null,
      emoji: null,
      id: docId,
      documentName: "Untitled Document",
    });

    await setDoc(doc(db, 'documentOutput', docId.toString()), {
      docId: docId,
      output: []
    })

    setLoading(false);
    router.replace("/workspace/" + params?.workspaceId + "/" + docId);
  }

  return (
    (<SidebarGroup>
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {workspaces.map((workspace) => (
            <Collapsible key={workspace.name}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <span>{workspace.emoji}</span>
                    <span>{workspace.name}</span>
                  </a>
                </SidebarMenuButton>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction
                    className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                    showOnHover>
                    <ChevronRight />
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <SidebarMenuAction showOnHover>
                  <Plus />
                </SidebarMenuAction>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {workspace.pages.map((page) => (
                      <SidebarMenuSubItem key={page.name}>
                        <SidebarMenuSubButton asChild>
                          <a href="#">
                            <span>{page.emoji}</span>
                            <span>{page.name}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>)
  );
}
