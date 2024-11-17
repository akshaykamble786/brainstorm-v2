import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { twMerge } from "tailwind-merge";
import { Toaster } from "@/components/ui/toaster";
import "@liveblocks/react-ui/styles.css";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Brainstorm",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={twMerge('bg-background', inter.className)}>
        <ClerkProvider
        afterSignOutUrl="/"
          appearance={{
            baseTheme: 'dark',
            // elements: {
            //   userButtonPopoverCard: "!bg-zinc-900", // Using !important and a darker color
            //   userButtonPopoverContent: "!bg-zinc-900 !text-white",
            //   userButtonPopoverActionButton: "!text-white hover:!bg-zinc-800",
            //   userButtonPopoverFooter: "!bg-zinc-900",
            //   userButtonPopoverHeader: "!bg-zinc-900",
            // },
            variables: {
              colorBackground: "#030014", // Zinc-900 hex value
              colorText: "#CAC2FF",
              colorTextSecondary: "#CAC2FF", // Zinc-400 for secondary text
            }
          }}
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
      </body>
    </html>
  );
}
