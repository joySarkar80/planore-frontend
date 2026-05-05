"use client";

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  PlusCircle, 
  Settings, 
  User, 
  LogOut,
  Bell,
  Menu,
  X,
  Mail,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Events', href: '/dashboard/events', icon: Calendar },
  { name: 'Pending Invitations', href: '/dashboard/invitations', icon: Mail },
  { name: 'My Reviews', href: '/dashboard/reviews', icon: MessageSquare },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row pt-0">
      {/* Sidebar Nav (Desktop) */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 border-r border-slate-200 bg-white z-40">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Planora</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all',
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <item.icon className={cn('w-5 h-5', isActive ? 'text-indigo-600' : 'text-slate-400')} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-100 italic text-slate-400 text-xs font-medium">
          <button className="flex items-center space-x-3 w-full hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 sticky top-0 z-50">
           <Link href="/" className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1 rounded shadow-sm">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">Planora</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Dashboard Header */}
        <header className="hidden lg:flex h-16 border-b border-slate-100 bg-white items-center justify-between px-8 sticky top-0 z-30">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Dashboard Area</h2>
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shadow-inner">JS</div>
              <span className="text-sm font-bold text-slate-700">Joy Sarkar</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 md:p-10 max-w-6xl mx-auto w-full flex-1">
          {children}
        </main>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-16 animate-in fade-in duration-300">
           <nav className="p-6 space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center space-x-4 px-6 py-4 rounded-2xl text-lg font-bold transition-all',
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600'
                  )}
                >
                  <item.icon className="w-6 h-6" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
             <button className="flex items-center space-x-4 px-6 py-4 rounded-2xl text-lg font-bold text-red-500 w-full mt-8 border-t border-slate-100 pt-8">
              <LogOut className="w-6 h-6" />
              <span>Logout Account</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
