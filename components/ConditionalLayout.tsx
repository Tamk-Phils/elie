"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/FloatingChatButton";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPath = pathname?.startsWith("/admin");

    return (
        <>
            {!isAdminPath && <Navbar />}
            <main className={`flex-grow ${!isAdminPath ? "pt-20" : ""}`}>
                {children}
            </main>
            {!isAdminPath && <FloatingChatButton />}
            {!isAdminPath && <Footer />}
        </>
    );
}
