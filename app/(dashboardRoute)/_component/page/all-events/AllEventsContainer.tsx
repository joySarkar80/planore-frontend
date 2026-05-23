'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { adminDeleteEvent, UpdateEventStatus, } from '@/services/events/clientEvent';
import { setFeaturedEvent } from '@/services/featuredEvent';

type EventStatus = 'APPROVED' | 'REJECTED';
type FilterStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

type AdminEvent = {
    id: string;
    title: string;
    startAt: string;
    status: EventStatus;
    owner: { id: string; name: string; avatar: string | null };
    featuredEvent: { id: string } | null;
    _count: { registrations: number; reviews: number };
};

const STATUS_OPTIONS: FilterStatus[] = ['PENDING', 'APPROVED', 'REJECTED'];

const STATUS_BADGE: Record<EventStatus, string> = {
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
};

type DeleteModal = { open: boolean; eventId: string | null; title: string };

export default function AllEventsContainer() {
    const [events, setEvents] = useState<AdminEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusMap, setStatusMap] = useState<Record<string, EventStatus>>({});
    const [changedRows, setChangedRows] = useState<Set<string>>(new Set());
    const [savingId, setSavingId] = useState<string | null>(null);
    const [featuringId, setFeaturingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleteModal, setDeleteModal] = useState<DeleteModal>({
        open: false,
        eventId: null,
        title: '',
    });
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({ total: 0, totalPages: 1 });

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (statusFilter) params.append('status', statusFilter);
            params.append('page', String(page));
            params.append('limit', '20');

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/events/admin?${params}`,
                { credentials: 'include', cache: 'no-store' }
            );
            const json = await res.json();

            if (json.success) {
                const rows: AdminEvent[] = json.data.data;
                setEvents(rows);
                setMeta({
                    total: json.data.meta.total,
                    totalPages: json.data.meta.totalPages,
                });
                const init: Record<string, EventStatus> = {};
                rows.forEach((e) => { init[e.id] = e.status; });
                setStatusMap(init);
                setChangedRows(new Set());
            }
        } catch {
            toast.error('Failed to load events');
        } finally {
            setLoading(false);
        }
    }, [search, statusFilter, page]);

    useEffect(() => { fetchEvents(); }, [fetchEvents]);

    const handleStatusChange = (id: string, val: EventStatus) => {
        setStatusMap((prev) => ({ ...prev, [id]: val }));
        const original = events.find((e) => e.id === id)?.status;
        setChangedRows((prev) => {
            const next = new Set(prev);
            val !== original ? next.add(id) : next.delete(id);
            return next;
        });
    };

    const handleSave = async (id: string) => {
        setSavingId(id);
        try {
            const res = await UpdateEventStatus(id, statusMap[id]);
            if (res.success) {
                toast.success('Status updated');
                await fetchEvents();
            } else {
                toast.error(res.message || 'Failed to update');
            }
        } catch { toast.error('Something went wrong'); }
        finally { setSavingId(null); }
    };

    const openDeleteModal = (id: string, title: string) =>
        setDeleteModal({ open: true, eventId: id, title });

    const handleDelete = async () => {
        if (!deleteModal.eventId) return;
        setDeletingId(deleteModal.eventId);
        try {
            const res = await adminDeleteEvent(deleteModal.eventId);
            if (res.success) {
                toast.success('Event deleted');
                setDeleteModal({ open: false, eventId: null, title: '' });
                await fetchEvents();
            } else {
                toast.error(res.message || 'Failed to delete');
            }
        } catch { toast.error('Something went wrong'); }
        finally { setDeletingId(null); }
    };

    const handleSetFeatured = async (id: string) => {
        setFeaturingId(id);
        try {
            const res = await setFeaturedEvent(id);
            if (res.success) {
                toast.success('Event set as featured');
                await fetchEvents();
            } else {
                toast.error(res.message || 'Failed');
            }
        } catch { toast.error('Something went wrong'); }
        finally { setFeaturingId(null); }
    };

    const fmt = (d: string, type: 'date' | 'time') => {
        const dt = new Date(d);
        return type === 'date'
            ? dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            : dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <div className="p-6 max-w-full">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">All Events</h1>
                <p className="text-sm text-gray-500 mt-0.5">{meta.total} total events</p>
            </div>

            {/* Filters */}
            <div className="mb-4 flex flex-wrap gap-3">
                <input
                    type="text"
                    placeholder="Search title or organizer…"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                    className="cursor-pointer border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option className='cursor-pointer' value="">All Statuses</option>
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                </div>
            ) : events.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-sm">No events found</div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-left">
                                {['Title', 'Date', 'Time', 'Status', 'Featured', 'Actions'].map((h) => (
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

                                        {/* Date */}
                                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                            {fmt(event.startAt, 'date')}
                                        </td>

                                        {/* Time */}
                                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                            {fmt(event.startAt, 'time')}
                                        </td>

                                        {/* Status dropdown   //jante hobe */}
                                        <td className="px-4 py-3 cursor-pointer whitespace-nowrap">
                                            <select
                                                value={currentStatus}
                                                onChange={(e) => handleStatusChange(event.id, e.target.value as EventStatus)}
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
                                                    onClick={() => handleSetFeatured(event.id)}
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
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() => handleSave(event.id)}
                                                    disabled={!changedRows.has(event.id) || savingId === event.id}
                                                    className="text-xs px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                                                >
                                                    {savingId === event.id ? 'Saving…' : 'Save'}
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(event.id, event.title)}
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
            )}

            {/* Pagination */}
            {meta.totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span>Page {page} of {meta.totalPages}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, meta.totalPages))}
                            disabled={page === meta.totalPages}
                            className="px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Event</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete{' '}
                            <span className="font-medium text-gray-900">"{deleteModal.title}"</span>?
                            This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setDeleteModal({ open: false, eventId: null, title: '' })}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={!!deletingId}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-60 transition-colors"
                            >
                                {deletingId ? 'Deleting…' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}