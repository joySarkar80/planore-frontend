'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { getMyJoinedEventsService } from '@/services/registrations/clientRegistration';
import { JoinedEventRow } from './JoinedEventRow';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function JoinedEventsContainer() {
    console.log("Rendering JoinedEventsContainer");
    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams();

    const fetchEvents = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await getMyJoinedEventsService();
            if (response.success) {
                setEvents(response.data || []);
            } else {
                setEvents([]);
            }
        } catch (error) {
            console.error(error);
            setEvents([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    // bfcache fix: browser back/forward করলেও data reload হবে
    useEffect(() => {
        const handlePageShow = (e: PageTransitionEvent) => {
            if (e.persisted) {
                // bfcache থেকে restore হয়েছে, তাই manually fetch করো
                fetchEvents();
            }
        };

        window.addEventListener('pageshow', handlePageShow);
        return () => window.removeEventListener('pageshow', handlePageShow);
    }, [fetchEvents]);

    // Stripe redirect handling
    useEffect(() => {
        const paymentStatus = searchParams.get('payment');
        if (!paymentStatus) return;

        if (paymentStatus === 'success') {
            toast.success('Payment completed successfully!');
        } else if (paymentStatus === 'cancel') {
            toast.error('Payment cancelled');
        }

        router.replace('/dashboard/joined-events');
    }, [searchParams, router]);

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-indigo-600 h-8 w-8" />
            </div>
        );
    }

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
                            <td colSpan={4} className="text-center py-10 text-slate-500">
                                No joined events found.
                            </td>
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