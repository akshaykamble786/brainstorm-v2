'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';
import { BrowserRouter } from 'react-router-dom';

const DynamicBreadcrumb = ({ workspaceName }) => {
    const pathname = usePathname();
    const [pathSegments, setPathSegments] = useState([]);

    useEffect(() => {
        const segments = pathname.split('/').filter(segment => segment);

        const pathItems = segments.map((segment, index) => {
            return {
                label: capitalizeFirstLetter(segment),
                path: '/' + segments.slice(0, index + 1).join('/')
            };
        });

        setPathSegments(pathItems);
    }, [pathname]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <BrowserRouter>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/" passHref legacyBehavior>
                            <BreadcrumbLink className="flex items-center">
                                <Home className="h-4 w-4 mr-1" />
                                Home
                            </BreadcrumbLink>
                        </Link>
                    </BreadcrumbItem>

                    {workspaceName && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link href="/workspace" passHref legacyBehavior>
                                    <BreadcrumbLink>
                                        {workspaceName}
                                    </BreadcrumbLink>
                                </Link>
                            </BreadcrumbItem>
                        </>
                    )}

                    {pathSegments.map((item, index) => (
                        <React.Fragment key={item.path}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {index === pathSegments.length - 1 ? (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                ) : (
                                    <Link href={item.path} passHref legacyBehavior>
                                        <BreadcrumbLink>
                                            {item.label}
                                        </BreadcrumbLink>
                                    </Link>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </BrowserRouter>
    );
};

export default DynamicBreadcrumb;