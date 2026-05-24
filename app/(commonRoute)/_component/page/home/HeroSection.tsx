import Link from 'next/link';
import { CalendarIcon, MapPin, Users } from 'lucide-react';
import type { FeaturedEventData } from '@/services/featuredEvent';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Props = { featured: FeaturedEventData | null };

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function formatTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

export default function HeroSection({ featured }: Props) {
    if (!featured) return <HeroFallback />;

    const { event } = featured;
    const isFree = parseFloat(event.registrationFee) === 0;

    return (
        <section className="relative overflow-hidden bg-slate-950 pt-10 pb-16 lg:pt-20 lg:pb-28">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <Badge
                        variant="secondary"
                        className="mb-6 py-1 px-4 text-sm font-semibold rounded-full border border-indigo-500/50 bg-indigo-500/10 text-indigo-400"
                    >
                        ⭐ Featured Event
                    </Badge>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-8">
                        {event.title}
                    </h1>

                    <div className="flex flex-wrap justify-center items-center gap-4 text-slate-300 mb-8 font-medium">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5 text-indigo-500" />
                            <span>
                                {formatDate(event.startAt)} at{" "}
                                {formatTime(event.startAt)}
                            </span>
                        </div>

                        <Badge
                            className={
                                isFree
                                    ? "bg-emerald-500/15 text-emerald-400 border-2 border-emerald-500/30 text-lg px-4 py-4 rounded-lg"
                                    : "bg-amber-500/15 text-amber-400 border-2 border-amber-500/30 text-lg px-4 py-4 rounded-lg"
                            }
                        >
                            {isFree
                                ? "FREE"
                                : `$${event.registrationFee}`}
                        </Badge>
                    </div>

                    <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-3xl mx-auto">
                        {event.description}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href={`/events/${event.id}`}>
                            <Button
                                size="lg"
                                className="w-full sm:w-auto h-14 px-8 text-lg font-bold bg-indigo-600 hover:bg-indigo-700"
                            >
                                Join Event Now
                            </Button>
                        </Link>

                        <Link href="/events">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto h-14 px-8 text-lg border-slate-700 text-white hover:bg-slate-800"
                            >
                                Explore Others
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function HeroFallback() {
    return (
        <section className="relative overflow-hidden bg-slate-950 pt-20 pb-32 lg:pt-32 lg:pb-48 flex items-center">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_50%,_#6366f1,_transparent_60%)]" />
            <div className="container mx-auto px-4 relative z-10 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                    Discover Amazing Events
                </h1>
                <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                    Find and join events that match your passion. From tech conferences to cultural festivals.
                </p>
                <Link
                    href="/events"
                    className="inline-flex items-center h-14 px-8 rounded-xl text-lg font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                    Explore All Events
                </Link>
            </div>
        </section>
    );
}