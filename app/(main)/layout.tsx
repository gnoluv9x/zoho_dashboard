import Header from "@/components/headers";
import StyledComponentsRegistry from "@/lib/registry";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import React from "react";
import { AppContextProvider } from "../../components/context/App";
import "../global.css";

const inter = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Zoho dashboard",
  description: "Dashboard UI for zoho sprints",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AppContextProvider>
            <main className="h-screen w-full px-3 pt-16">
              <div className="container mx-auto">
                <Header />
                {children}
              </div>
            </main>
          </AppContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
