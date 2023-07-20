import React, { Suspense } from "react";
import Header from "@/components/headers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <>{children}</>
        </Suspense>
      </body>
    </html>
  );
}
