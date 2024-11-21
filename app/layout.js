import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { twMerge } from "tailwind-merge";
import { Toaster } from "@/components/ui/toaster";
import "@liveblocks/react-ui/styles.css";
import { EdgeStoreProvider } from "@/lib/edgestore";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

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
