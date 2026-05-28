import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RecentEventType } from '@/services/dashboard';
import { formatDate } from './helpers';


type RecentEventsTableProps = {
    events: RecentEventType[];
    loading: boolean;
};

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, string> = {
        APPROVED: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        PENDING: 'bg-amber-50 text-amber-700 border-amber-100',
        REJECTED: 'bg-red-50 text-red-700 border-red-100',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${map[status] ?? 'bg-slate-50 text-slate-600 border-slate-100'}`}>
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
    );
}

function VisibilityBadge({ visibility, registrationFee }: { visibility: string; registrationFee: string | number }) {
    const feeStatus = Number(registrationFee) === 0 ? 'Free' : 'Paid';
    const visibilityText = visibility.charAt(0) + visibility.slice(1).toLowerCase();

    return (
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold uppercase border border-indigo-100 whitespace-nowrap">
            {visibilityText} - {feeStatus}
        </span>
    );
}

function SkeletonRows() {
    return (
        <>
            {Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                    {Array.from({ length: 6 }).map((__, j) => (
                        <td key={j} className="px-6 py-5">
                            <div className="h-4 bg-slate-100 animate-pulse rounded w-24" />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}

export default function RecentEventsTable({ events, loading }: RecentEventsTableProps) {
    return (
        <Card className="lg:col-span-2 border-slate-200/60 bg-white overflow-hidden rounded-2xl shadow-sm">
            <CardHeader className="border-b border-slate-50 p-6 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-extrabold text-slate-900">
                    Recently Created Events
                </CardTitle>
                <Link href="/dashboard/my-events">
                    <Button variant="ghost" size="sm" className="text-indigo-600 font-bold hover:text-indigo-700 hover:bg-indigo-50">
                        View All
                    </Button>
                </Link>
            </CardHeader>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50">
                            {['Event Name', 'Created', 'Event Date', 'Type', 'Status', ''].map((h) => (
                                <th key={h} className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <SkeletonRows />
                        ) : events.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-400 font-medium">
                                    No events created in the last 7 days.
                                </td>
                            </tr>
                        ) : (
                            events.map((event) => (
                                // console.log(event),
                                <tr key={event.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-5 font-bold text-slate-900 max-w-[200px] truncate">
                                        {event.title}
                                    </td>
                                    <td className="px-6 py-5 text-sm font-medium text-slate-500">
                                        {formatDate(event.createdAt)}
                                    </td>
                                    <td className="px-6 py-5 text-sm font-medium text-slate-500">
                                        {formatDate(event.startAt)}
                                    </td>
                                    <td className="px-6 py-5">
                                        <VisibilityBadge visibility={event.visibility} registrationFee={event.registrationFee} />
                                    </td>
                                    <td className="px-6 py-5">
                                        <StatusBadge status={event.status} />
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <Link href={`/events/${event.id}`}>
                                            <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}