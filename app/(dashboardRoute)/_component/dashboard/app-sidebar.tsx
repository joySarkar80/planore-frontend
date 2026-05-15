"use client";

import Link from "next/link";
import { Calendar, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_DATA } from "@/lib/nav-data";
import { NavMain } from "./nav-main";
import { UserLogOut } from "@/services/auth";
import { useRouter } from "next/navigation";

interface AppSidebarProps {
    role: "ADMIN" | "USER";
}

export function AppSidebar({ role }: AppSidebarProps) {
    const router = useRouter();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = NAV_DATA[role][0].items;

    const handleLogOut = async () => {
        try {
            await UserLogOut();

            window.dispatchEvent(new Event("authChanged"));

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 border-r border-slate-200 bg-white z-40">
                <div className="p-6 border-b border-slate-100">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-1.5 rounded-lg">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>

                        <span className="text-xl font-bold text-slate-900">
                            Planora
                        </span>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <NavMain items={navItems} />
                </div>

                <div className="border-t border-slate-100 p-4">
                    <button
                        onClick={handleLogOut}
                        className="flex items-center gap-3 text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-indigo-600 p-1 rounded">
                        <Calendar className="w-4 h-4 text-white" />
                    </div>

                    <span className="font-bold">Planora</span>
                </Link>

                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </header>

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white pt-16 lg:hidden">
                    <div className="space-y-4 p-6">
                        <NavMain items={navItems} />

                        <button
                            onClick={handleLogOut}
                            className="flex items-center gap-3 pt-6 text-red-500"
                        >
                            <LogOut className="h-5 w-5" />

                            <span className="font-semibold">Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}