'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import UpcomingEventCard from './UpcomingEventCard';
import type { PublicEvent } from '@/services/events';

type Props = { events: PublicEvent[] };

export default function UpcomingEventsSlider({ events }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: dir === 'left' ? -330 : 330,
            behavior: 'smooth',
        });
    };

    return (
        <section className="container mx-auto px-4">
            {/* Header - Fixed to Top Center */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Upcoming Events
                </h2>
                <p className="text-slate-500 mt-1.5 text-sm">
                    Find your next big experience
                </p>
            </div>

            {/* Slider Card List */}
            {events.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                    No upcoming events yet. Check back soon!
                </div>
            ) : (
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {events.map((event) => (
                        <UpcomingEventCard key={event.id} event={event} />
                    ))}
                </div>
            )}

            {/* Footer Actions (Arrows & View All) - Fixed to Bottom Center */}
            <div className="flex flex-col items-center justify-center gap-4 mt-4">
                {/* Scroll buttons & View All in a single row */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                        className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* View All Button */}
                    <Link
                        href="/events"
                        className="flex items-center gap-1 text-indigo-600 font-semibold text-sm hover:underline px-2"
                    >
                        View all <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                        className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );

}