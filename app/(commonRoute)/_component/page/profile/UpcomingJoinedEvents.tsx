import Link from 'next/link';
import { CalendarDays, ArrowRight } from 'lucide-react';
import type { UpcomingRegistration } from '@/services/users';
import UpcomingEventCard from './UpcomingEventCard';
// import UpcomingEventCard from './UpcomingEventCard';

type Props = {
    registrations: UpcomingRegistration[]
};

export default function UpcomingJoinedEvents({ registrations }: Props) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Upcoming Events</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Events you've joined</p>
                </div>
                <Link
                    href="/dashboard/joined-events"
                    className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                    View All
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {/* List Configuration / Empty State */}
            {registrations.length === 0 ? (
                <div className="py-16 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                        <CalendarDays className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-slate-500 font-medium text-sm">No upcoming events</p>
                    <p className="text-slate-400 text-xs mt-1">Events you join will appear here</p>
                    <Link
                        href="/events"
                        className="inline-block mt-4 text-sm text-indigo-600 font-semibold hover:underline"
                    >
                        Browse Events →
                    </Link>
                </div>
            ) : (
                <ul className="divide-y divide-slate-100">
                    {registrations.map((reg) => (
                        <UpcomingEventCard key={reg.id} registration={reg} />
                    ))}
                </ul>
            )}
        </div>
    );
}