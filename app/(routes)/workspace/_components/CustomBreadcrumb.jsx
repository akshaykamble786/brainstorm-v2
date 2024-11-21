import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/config/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const DynamicBreadcrumb = () => {
    const pathname = usePathname();
    const [pathSegments, setPathSegments] = useState([]);
    const [names, setNames] = useState({
        workspaceName: '',
        documentName: ''
    });

    const fetchNames = useCallback(async () => {
        try {
            const segments = pathname.split('/').filter(segment => segment);
            if (segments.length >= 2 && segments[0] === 'workspace') {
                const workspaceId = segments[1];
                const workspaceDoc = await getDoc(doc(db, 'workspaces', workspaceId));
                if (workspaceDoc.exists()) {
                    setNames(prev => ({
                        ...prev,
                        workspaceName: workspaceDoc.data().workspaceName
                    }));
                }

                if (segments.length >= 3) {
                    const documentId = segments[2];
                    const documentDoc = await getDoc(doc(db, 'documents', documentId));
                    if (documentDoc.exists()) {
                        setNames(prev => ({
                            ...prev,
                            documentName: documentDoc.data().documentName
                        }));
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching names:', error);
        }
    }, [pathname]);

    useEffect(() => {
        fetchNames();
    }, [fetchNames]);

    const pathItems = useMemo(() => {
        const segments = pathname.split('/').filter(segment => segment);
        return segments
            .filter(segment => segment !== 'workspace')
            .map((segment, index, filteredSegments) => {
                let label = segment;
                let currentPath = '/' + segments.slice(0, segments.indexOf(segment) + 1).join('/');

                if (segments.indexOf(segment) === 1 && names.workspaceName) {
                    label = names.workspaceName;
                    currentPath = '/dashboard';
                }
                else if (segments.indexOf(segment) === 2 && names.documentName) {
                    label = names.documentName;
                }
                else {
                    label = capitalizeFirstLetter(segment);
                }

                return {
                    label,
                    path: currentPath
                };
            });
    }, [pathname, names]);

    return (
        <header className='flex h-3 shrink-0 items-center gap-1'>
            <div className='flex flex-1 items-center gap-2'>
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/" passHref legacyBehavior>
                            <BreadcrumbLink className="flex items-center text-md text-foreground">
                                Home
                            </BreadcrumbLink>
                        </Link>
                    </BreadcrumbItem>

                    {pathItems.map((item, index) => (
                        <React.Fragment key={item.path}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="text-md">
                                {index === pathItems.length - 1 ? (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                ) : (
                                    <Link href={item.path} passHref legacyBehavior>
                                        <BreadcrumbLink className="text-foreground">
                                            {item.label}
                                        </BreadcrumbLink>
                                    </Link>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    );
}

export default DynamicBreadcrumb;