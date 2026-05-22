'use client';

import { useEffect, useState } from 'react';
import InvitationRow from './InvitationRow';
import { getMyInvitations } from '@/services/invititions';

export default function InvitationsContainer() {
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (invitations.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                <h3 className="text-lg font-medium text-slate-600">No pending invitations</h3>
                <p className="text-slate-400 mt-2">You haven't received any new event invitations yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {invitations.map((inv: any) => (
                <InvitationRow key={inv.id} invitation={inv} />
            ))}
        </div>
    );
}