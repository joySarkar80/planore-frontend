'use client';

import { fmt } from '@/lib/utils';
import Link from 'next/link';

export type EventStatus = 'APPROVED' | 'REJECTED' | 'PENDING';

export type AdminEvent = {
    id: string;
    title: string;
    startAt: string;
    createdAt: string;
    status: EventStatus;
    owner: { id: string; name: string; avatar: string | null };
    featuredEvent: { id: string } | null;
    _count: { registrations: number; reviews: number };
};

const STATUS_OPTIONS: EventStatus[] = ['PENDING', 'APPROVED', 'REJECTED'];

const STATUS_BADGE: Record<EventStatus, string> = {
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    PENDING: 'bg-yellow-100 text-yellow-800', // Added pending badge for completeness
};

interface EventsTableProps {
    events: AdminEvent[];
    loading: boolean;
    statusMap: Record<string, EventStatus>;
    changedRows: Set<string>;
    savingId: string | null;
    featuringId: string | null;
    onStatusChange: (id: string, val: EventStatus) => void;
    onSave: (id: string) => void;
    onDeleteClick: (id: string, title: string) => void;
    onFeatureClick: (id: string) => void;
}

export default function EventsTable({
    events,
    loading,
    statusMap,
    changedRows,
    savingId,
    featuringId,
    onStatusChange,
    onSave,
    onDeleteClick,
    onFeatureClick,
}: EventsTableProps) {
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (events.length === 0) {
        return <div className="text-center py-20 text-gray-400 text-sm">No events found</div>;
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-left">
                        {['Title', 'Created Date', 'Start Date', 'Start Time', 'Status', 'Featured', 'Actions'].map((h) => (
                            <th key={h} className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {events.map((event) => {
                        const currentStatus = statusMap[event.id] ?? event.status;
                        return (
                            <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                                {/* Title */}
                                <td className="px-4 py-3">
                                    <p className="font-medium text-gray-900 max-w-[180px] truncate">{event.title}</p>
                                    <p className="text-xs text-gray-400">{event.owner.name}</p>
                                </td>

                                {/* Dates */}
                                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                    {fmt(event.createdAt, 'date')}
                                </td>
                                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                    {fmt(event.startAt, 'date')}
                                </td>
                                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                    {fmt(event.startAt, 'time')}
                                </td>

                                {/* Status */}
                                <td className="px-4 py-3 cursor-pointer whitespace-nowrap">
                                    <select
                                        value={currentStatus}
                                        onChange={(e) => onStatusChange(event.id, e.target.value as EventStatus)}
                                        className={`text-xs font-semibold px-2 py-1 rounded-full cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 ${STATUS_BADGE[currentStatus]}`}
                                    >
                                        {STATUS_OPTIONS.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </td>

                                {/* Featured */}
                                <td className="px-4 py-3">
                                    {event.featuredEvent ? (
                                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                                            ⭐ Featured
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => onFeatureClick(event.id)}
                                            disabled={featuringId === event.id || event.status !== 'APPROVED'}
                                            title={event.status !== 'APPROVED' ? 'Event must be APPROVED to feature' : ''}
                                            className="text-xs px-3 py-1 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {featuringId === event.id ? '…' : 'Set Featured'}
                                        </button>
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/events/${event.id}`}
                                            className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap"
                                        >
                                            View Event
                                        </Link>
                                        <button
                                            onClick={() => onSave(event.id)}
                                            disabled={!changedRows.has(event.id) || savingId === event.id}
                                            className="text-xs px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                                        >
                                            {savingId === event.id ? 'Saving…' : 'Save'}
                                        </button>
                                        <button
                                            onClick={() => onDeleteClick(event.id, event.title)}
                                            className="text-xs px-3 py-1 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}