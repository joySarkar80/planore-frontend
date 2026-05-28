import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
                <p className="text-slate-500 font-medium">
                    Welcome back! Here&apos;s what&apos;s happening with your events today.
                </p>
            </div>
            <Link href="/dashboard/create-event">
                <Button className="bg-indigo-600 hover:bg-indigo-700 h-12 px-6 font-bold shadow-lg shadow-indigo-100">
                    <Plus className="w-5 h-5 mr-2" />
                    Create New Event
                </Button>
            </Link>
        </div>
    );
}