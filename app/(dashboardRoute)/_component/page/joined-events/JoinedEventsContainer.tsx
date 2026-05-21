'use client'

import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getMyJoinedEventsService } from '@/services/registrations/clientRegistration';
import { JoinedEventRow } from './JoinedEventRow';


export default function JoinedEventsContainer() {
    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchEvents = async () => {
        setIsLoading(true);
        const response = await getMyJoinedEventsService();
        if (response.success) {
            setEvents(response.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="animate-spin text-indigo-600 h-8 w-8" /></div>;

    return (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="p-4 font-bold text-slate-700 text-sm">Event Name</th>
                        <th className="p-4 font-bold text-slate-700 text-sm">Join Status</th>
                        <th className="p-4 font-bold text-slate-700 text-sm">Payment Status</th>
                        <th className="p-4 font-bold text-slate-700 text-sm text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {events.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center py-10 text-slate-500">No joined events found.</td>
                        </tr>
                    ) : (
                        events.map((reg) => (
                            <JoinedEventRow
                                key={reg.id}
                                registration={reg}
                                onRefresh={fetchEvents}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}