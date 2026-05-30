"use client";

import Link from "next/link";
import { Calendar, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { NAV_DATA } from "@/lib/nav-data";
import { NavMain } from "./nav-main";
import { UserLogOut } from "@/services/auth";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface AppSidebarProps {
    role: "ADMIN" | "USER";
}

export function AppSidebar({ role }: AppSidebarProps) {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navSection = NAV_DATA[role][0];

    const handleLogOut = async () => {
        try {
            await UserLogOut();
            window.dispatchEvent(new Event("authChanged"));
            setIsMobileMenuOpen(false); 
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
                            Krowdly
                        </span>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <NavMain section={navSection} />
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

            {/* Mobile Header & Sheet Sidebar */}
            <header className="lg:hidden sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-indigo-600 p-1 rounded">
                        <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold">Krowdly</span>
                </Link>

                {/* Shadcn Sheet Component */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
                        <Menu className="h-6 w-6" />
                    </SheetTrigger>

                    <SheetContent side="right" className="flex flex-col gap-6 pt-16 w-full max-w-xs bg-white">
                        <div className="flex-1 overflow-y-auto">
                            
                            <NavMain section={navSection} onClose={() => setIsMobileMenuOpen(false)} />
                        </div>

                        <div className="border-t border-slate-100 pt-4">
                            <button
                                onClick={handleLogOut}
                                className="flex items-center gap-3 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors w-full"
                            >
                                <LogOut className="h-5 w-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </SheetContent>
                </Sheet>
            </header>
        </>
    );
}
