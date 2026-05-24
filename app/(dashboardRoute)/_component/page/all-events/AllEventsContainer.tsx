'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { adminDeleteEvent, UpdateEventStatus, getAdminEvents } from '@/services/events/clientEvent';
import { setFeaturedEvent } from '@/services/featuredEvent';

// Imorting breakdown components
import EventFilters from './EventFilters';
import EventsTable, { AdminEvent, EventStatus } from './EventsTable';
import DeleteEventModal from './DeleteEventModal';

type DeleteModalState = { open: boolean; eventId: string | null; title: string };

export default function AllEventsContainer() {
    const [events, setEvents] = useState<AdminEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusMap, setStatusMap] = useState<Record<string, EventStatus>>({});
    const [changedRows, setChangedRows] = useState<Set<string>>(new Set());

    // Action States
    const [savingId, setSavingId] = useState<string | null>(null);
    const [featuringId, setFeaturingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Modal State
    const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
        open: false,
        eventId: null,
        title: '',
    });

    // Filter & Pagination States
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({ total: 0, totalPages: 1 });

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        try {
            const queryParams = {
                search: search || undefined,
                status: statusFilter || undefined,
                page,
                limit: 20
            };

            const json = await getAdminEvents(queryParams);

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

    return (
        <div className="p-6 max-w-full">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">All Events</h1>
                <p className="text-sm text-gray-500 mt-0.5">{meta.total} total events</p>
            </div>

            {/* Filters */}
            <EventFilters
                search={search}
                statusFilter={statusFilter}
                onSearchChange={(val) => { setSearch(val); setPage(1); }}
                onStatusChange={(val) => { setStatusFilter(val); setPage(1); }}
            />

            {/* Table Component */}
            <EventsTable
                events={events}
                loading={loading}
                statusMap={statusMap}
                changedRows={changedRows}
                savingId={savingId}
                featuringId={featuringId}
                onStatusChange={handleStatusChange}
                onSave={handleSave}
                onDeleteClick={(id, title) => setDeleteModal({ open: true, eventId: id, title })}
                onFeatureClick={handleSetFeatured}
            />

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

            {/* Delete Modal Component */}
            <DeleteEventModal
                open={deleteModal.open}
                title={deleteModal.title}
                deletingId={deletingId}
                onClose={() => setDeleteModal({ open: false, eventId: null, title: '' })}
                onConfirm={handleDelete}
            />
        </div>
    );
}