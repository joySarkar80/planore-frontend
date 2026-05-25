import Link from 'next/link';
import { CalendarDays, MapPin, ArrowRight, ChevronRight } from 'lucide-react';
import type { UpcomingRegistration } from '@/services/users';

type Props = { registrations: UpcomingRegistration[] };

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function formatTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

const VISIBILITY_BADGE = {
    PUBLIC: 'bg-green-50 text-green-700',
    PRIVATE: 'bg-purple-50 text-purple-700',
};

const PAYMENT_BADGE: Record<string, string> = {
    FREE: 'bg-emerald-50 text-emerald-700',
    PAID: 'bg-blue-50 text-blue-700',
    UNPAID: 'bg-amber-50 text-amber-700',
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

            {/* List */}
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
                        <li key={reg.id}>
                            <Link
                                href={`/events/${reg.event.id}`}
                                className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 transition-colors group"
                            >
                                {/* Left */}
                                <div className="min-w-0 flex-1">
                                    <p className="font-semibold text-slate-900 text-sm truncate group-hover:text-indigo-600 transition-colors">
                                        {reg.event.title}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                                        <div className="flex items-center gap-1 text-xs text-slate-400">
                                            <CalendarDays className="w-3 h-3 shrink-0" />
                                            <span>
                                                {formatDate(reg.event.startAt)} · {formatTime(reg.event.startAt)}
                                            </span>
                                        </div>
                                        {reg.event.venue && (
                                            <div className="flex items-center gap-1 text-xs text-slate-400">
                                                <MapPin className="w-3 h-3 shrink-0" />
                                                <span className="truncate max-w-[120px]">{reg.event.venue}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Badges */}
                                    <div className="flex gap-2 mt-2">
                                        <span
                                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${VISIBILITY_BADGE[reg.event.visibility]}`}
                                        >
                                            {reg.event.visibility}
                                        </span>
                                        <span
                                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${parseFloat(reg.event.registrationFee) === 0
                                                    ? PAYMENT_BADGE.FREE
                                                    : PAYMENT_BADGE[reg.paymentStatus] ?? PAYMENT_BADGE.UNPAID
                                                }`}
                                        >
                                            {parseFloat(reg.event.registrationFee) === 0
                                                ? 'FREE'
                                                : `৳${reg.event.registrationFee}`}
                                        </span>
                                    </div>
                                </div>

                                {/* Right arrow */}
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 shrink-0 transition-colors" />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}