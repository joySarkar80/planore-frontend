"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavMainProps {
  items: {
    title: string;
    url: string;
    icon: any;
  }[];
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {items.map((item) => {
        const isActive = pathname === item.url;

        return (
          <Link
            key={item.title}
            href={item.url}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all",
              isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon
              className={cn(
                "h-5 w-5",
                isActive ? "text-indigo-600" : "text-slate-400"
              )}
            />

            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}