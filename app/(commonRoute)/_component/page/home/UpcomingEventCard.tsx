import Link from 'next/link';
import { CalendarIcon, Users, MapPin } from 'lucide-react';
import type { PublicEvent } from '@/services/events';

type Props = { event: PublicEvent };

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export default function UpcomingEventCard({ event }: Props) {
    const isFree = parseFloat(event.registrationFee) === 0;
    return (
        <div className="w-[300px] shrink-0 group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            {/* Content */}
            <div className="p-5">
                {/* Badges Layout */}
                <div className="flex items-center justify-between w-full mb-4">
                    <span className="text-slate-600 text-xs font-semibold bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60 uppercase">
                        {event.visibility}
                    </span>
                    <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${isFree
                            ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-600 border border-amber-500/30'
                            }`}
                    >
                        {isFree ? 'FREE' : `$${event.registrationFee}`}
                    </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
                    {event.title}
                </h3>

                <div className="space-y-2 mb-5">
                    <div className="flex items-center text-sm text-slate-500">
                        <CalendarIcon className="w-3.5 h-3.5 mr-2 text-indigo-500 shrink-0" />
                        <span>{formatDate(event.startAt)}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                        <Users className="w-3.5 h-3.5 mr-2 text-indigo-500 shrink-0" />
                        <span className="truncate">By {event.owner.name}</span>
                    </div>
                    {event.venue && (
                        <div className="flex items-center text-sm text-slate-500">
                            <MapPin className="w-3.5 h-3.5 mr-2 text-indigo-500 shrink-0" />
                            <span className="truncate">{event.venue}</span>
                        </div>
                    )}
                </div>

                <Link
                    href={`/events/${event.id}`}
                    className="bg-slate-900 text-white block w-full text-center py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
                >
                    View Details
                </Link>
            </div>
        </div>
    );

}