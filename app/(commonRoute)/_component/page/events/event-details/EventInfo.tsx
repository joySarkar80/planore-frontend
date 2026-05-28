import { Card, CardContent } from '@/components/ui/card'
import { Calendar, MapPin, Clock, ShieldCheck, Video } from 'lucide-react'

interface EventInfoProps {
    event: {
        startAt: string;
        venue: string | null;
        eventLink: string | null;
        description: string | null;
        registrationFee: string;
    };
}

export function EventInfo({ event }: EventInfoProps) {
    const startDate = new Date(event.startAt);
    const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(startDate);
    const formattedTime = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(startDate);
    const fee = Number(event.registrationFee);

    return (
        <Card className="rounded-[2rem] shadow-xl border-none overflow-hidden bg-white">
            <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                            <Calendar className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Date</div>
                            <div className="text-lg font-bold text-slate-900">{formattedDate}</div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                            <Clock className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Time</div>
                            <div className="text-lg font-bold text-slate-900">{formattedTime}</div>
                        </div>
                    </div>

                    {/* Venue (Null-safe) */}
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                            <MapPin className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Venue</div>
                            <div className="text-lg font-bold text-slate-900 truncate max-w-[220px]">
                                {event.venue ? event.venue : <span className="text-slate-400 italic text-sm">No physical venue</span>}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                            <ShieldCheck className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Fee</div>
                            <div className="text-lg font-bold text-slate-900">
                                {fee === 0 ? 'Free Access' : `$${fee}`}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event Link (Conditional rendering if not null) */}
                {event.eventLink && (
                    <div className="mb-8 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Video className="h-5 w-5 text-indigo-600" />
                            <span className="font-bold text-slate-700 text-sm">Virtual Event Access Link</span>
                        </div>
                    </div>
                )}

                {/* Description (Null-safe) */}
                <div className="prose prose-slate max-w-none">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">About this event</h3>
                    <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap break-words">
                        {event.description ? event.description.trim() : "No description provided for this event."}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}