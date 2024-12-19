import { Toaster } from "@/components/ui/toaster";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";

export function Providers({ children }) {
    return (
        <ClerkProvider
            afterSignOutUrl="/"
        >
            <EdgeStoreProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                >
                    <Toaster />
                    {children}
                </ThemeProvider>
            </EdgeStoreProvider>
        </ClerkProvider>
    )
}