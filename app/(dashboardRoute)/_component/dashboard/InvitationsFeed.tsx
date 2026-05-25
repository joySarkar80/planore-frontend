import { Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { InvitationType } from '@/services/dashboard';
import { timeAgo } from './helpers';


type InvitationsFeedProps = {
    invitations: InvitationType[];
    loading: boolean;
};

function SkeletonItems() {
    return (
        <>
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 animate-pulse flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-100 animate-pulse rounded w-3/4" />
                        <div className="h-3 bg-slate-100 animate-pulse rounded w-1/2" />
                        <div className="h-3 bg-slate-100 animate-pulse rounded w-1/4" />
                    </div>
                </div>
            ))}
        </>
    );
}

export default function InvitationsFeed({ invitations, loading }: InvitationsFeedProps) {
    const visible = invitations.slice(0, 4);

    return (
        <Card className="border-slate-200/60 bg-white rounded-2xl shadow-sm">
            <CardHeader className="border-b border-slate-50 p-6 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-extrabold text-slate-900">Invitations</CardTitle>
                <Link href="/dashboard/invitations">
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </Link>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-8">
                    {loading ? (
                        <SkeletonItems />
                    ) : visible.length === 0 ? (
                        <p className="text-sm text-slate-400 font-medium text-center py-4">
                            No invitations yet.
                        </p>
                    ) : (
                        visible.map((inv, i) => (
                            <div key={inv.id} className="flex gap-4 relative">
                                {i < visible.length - 1 && (
                                    <div className="absolute left-[19px] top-10 bottom-0 w-px bg-slate-100" />
                                )}
                                <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                                    <Clock className="w-5 h-5 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 leading-snug">
                                        {inv.event.title}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1 font-medium">
                                        Invited By: {inv.invitedBy?.name ?? 'Unknown'}
                                    </p>
                                    <p className="text-[10px] font-bold text-indigo-500 mt-2 uppercase tracking-tight">
                                        {timeAgo(inv.createdAt)}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}