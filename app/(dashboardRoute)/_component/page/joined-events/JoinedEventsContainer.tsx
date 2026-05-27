'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { getMyJoinedEventsService } from '@/services/registrations/clientRegistration';
import { JoinedEventRow } from './JoinedEventRow';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

type Filter = 'ALL EVENTS' | 'UPCOMING' | 'PAST';

const FILTER_OPTIONS: Filter[] = ['ALL EVENTS', 'UPCOMING', 'PAST'];

export default function JoinedEventsContainer() {
    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<Filter>('ALL EVENTS');

    const router = useRouter();
    const searchParams = useSearchParams();

    const fetchEvents = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await getMyJoinedEventsService(filter);
            if (response.success) {
                setEvents(response.data || []);
            } else {
                setEvents([]);
            }
        } catch {
            setEvents([]);
        } finally {
            setIsLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    // bfcache fix
    useEffect(() => {
        const handlePageShow = (e: PageTransitionEvent) => {
            if (e.persisted) fetchEvents();
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

    return (
        <div className="p-6 max-w-full">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Joined Events</h1>
                <p className="text-slate-500 mt-1">Manage your event participations, payments, and reviews.</p>
                <p className="text-sm text-gray-500 mt-0.5">{events.length} events</p>
            </div>

            {/* Filter Dropdown */}
            <div className="mb-4">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as Filter)}
                    className="cursor-pointer border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {FILTER_OPTIONS.map((f) => (
                        <option key={f} value={f}>{f}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">Event Name</th>
                                <th className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">Visibility</th>
                                <th className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">Join Date</th>
                                <th className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">Join Time</th>
                                <th className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">Join Status</th>
                                <th className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">Payment Status</th>
                                <th className="px-4 py-3 font-semibold text-gray-700 text-right whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="py-16 text-center">
                                        <div className="flex justify-center">
                                            <Loader2 className="animate-spin text-indigo-600 h-7 w-7" />
                                        </div>
                                    </td>
                                </tr>
                            ) : events.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-16 text-gray-400 text-sm">
                                        No {filter.toLowerCase()} events found.
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
            </div>
        </div>
    );
}