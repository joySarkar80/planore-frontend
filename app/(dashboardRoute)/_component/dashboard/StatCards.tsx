import { Calendar as CalendarIcon, Users, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type StatCardsProps = {
    upcomingApprovedCount: number | null;
    upcomingRegistrationsCount: number | null;
    loading: boolean;
};

const STATS = (upcoming: number | null, registrations: number | null) => [
    {
        name: 'Active Events',
        header: 'All Approved Events',
        value: upcoming !== null ? String(upcoming) : '—',
        icon: CalendarIcon,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
    },
    {
        name: 'Total Registrations',
        header: 'Upcoming All Events Registrations',
        value: registrations !== null ? String(registrations) : '—',
        icon: Users,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
    },
    {
        name: 'Profile Views',
        header: 'All Events Profile Views',
        value: '1.2k',
        icon: Eye,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
    },
];

export default function StatCards({ upcomingApprovedCount, upcomingRegistrationsCount, loading }: StatCardsProps) {
    const stats = STATS(upcomingApprovedCount, upcomingRegistrationsCount);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <Card
                    key={stat.name}
                    className="border-slate-200/60 shadow-sm bg-white overflow-hidden hover:border-indigo-200 transition-colors"
                >
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div className="text-right text-xs font-bold text-slate-400 uppercase tracking-widest">
                                {stat.header}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                                {stat.name}
                            </p>
                            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                                {loading ? (
                                    <span className="inline-block w-10 h-8 bg-slate-100 animate-pulse rounded" />
                                ) : (
                                    stat.value
                                )}
                            </h3>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}