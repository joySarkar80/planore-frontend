'use client';

import { useEffect, useState } from 'react';
import InvitationRow from './InvitationRow';
import { getMyInvitations } from '@/services/invititions';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function InvitationsContainer() {
    const [invitations, setInvitations] = useState<any[]>([]); // TypeScript typed array array
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const data = await getMyInvitations();
                setInvitations(data || []);
            } catch (error) {
                console.error("Error fetching invitations:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInvitations();
    }, []);

    // Loading state center layout format-e thakbe
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Dynamic Back Button - Ekhon eti data thaka ba na thaka obostha shobshomoy kaj korbe */}
            <button
                type="button"
                onClick={() => router.back()}
                className="mb-2 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 transition hover:text-indigo-700 cursor-pointer"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </button>

            {/* Header info */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Event Invitations</h1>
                <p className="text-slate-500 mt-1">
                    Review and respond to events you have been invited to.
                </p>
            </div>

            {/* Main Data Section Conditional Block */}
            {invitations.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-medium text-slate-600">No pending invitations</h3>
                    <p className="text-slate-400 mt-2">You haven't received any new event invitations yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {invitations.map((inv: any) => (
                        <InvitationRow key={inv.id} invitation={inv} />
                    ))}
                </div>
            )}
        </div>
    );
}
