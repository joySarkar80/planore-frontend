'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CalendarDays, MapPin, ChevronRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { payPrivateEvent } from '@/services/registrations/clientRegistration';
import type { UpcomingRegistration } from '@/services/users';

type Props = {
    registration: UpcomingRegistration
};

// Pure Helper Functions moved outside component to prevent re-allocation on re-render
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

export default function UpcomingEventCard({ registration: reg }: Props) {
    const [loading, setLoading] = useState(false);

    const isFree = parseFloat(reg.event.registrationFee) === 0;

    return (
        <li>
            <Link
                href={`/events/${reg.event.id}`}
                className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 transition-colors group"
            >
                {/* Left Content */}
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

                    {/* Badges Layout */}
                    <div className="flex gap-2 mt-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${VISIBILITY_BADGE[reg.event.visibility as keyof typeof VISIBILITY_BADGE] || ''}`}>
                            {reg.event.visibility}
                        </span>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isFree ? PAYMENT_BADGE.FREE : (PAYMENT_BADGE[reg.paymentStatus] ?? PAYMENT_BADGE.UNPAID)}`}>
                            {isFree ? 'FREE' : `$${reg.event.registrationFee}`}
                        </span>

                        {reg.paymentStatus !== 'FREE' && reg.paymentStatus && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${VISIBILITY_BADGE[reg.event.visibility as keyof typeof VISIBILITY_BADGE] || ''}`}>
                                {reg.paymentStatus}
                            </span>
                        )}
                    </div>
                </div>



                {/* Right Action Indicator */}
                <div className="flex items-center gap-2">
                    {loading && <span className="text-xs text-slate-400 animate-pulse">Processing...</span>}
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 shrink-0 transition-colors" />
                </div>
            </Link>
        </li>
    );
}