'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

import { getMyEvents, deleteEvent } from '@/services/events'
import DeleteConfirmModal from '../../../_component/page/my-events/DeleteConfirmModal'
import MyEventsFilters from './MyEventsFilters'
import MyEventCard, { MyEvent } from './MyEventsCard'
import { useRouter } from 'next/navigation'

type DeleteModalState = {
    open: boolean
    eventId: string | null
    title: string
}

export default function MyEventsContainer() {
    const [events, setEvents] = React.useState<MyEvent[]>([])
    const [loading, setLoading] = React.useState(true)
    const router = useRouter();

    const [search, setSearch] = React.useState('')
    const [statusFilter, setStatusFilter] = React.useState('')
    const [page, setPage] = React.useState(1)

    const [meta, setMeta] = React.useState({
        total: 0,
        totalPages: 1,
    })

    const [deleteModal, setDeleteModal] = React.useState<DeleteModalState>({
        open: false,
        eventId: null,
        title: '',
    })

    const [deletingId, setDeletingId] = React.useState<string | null>(null)

    // debounce input state (ONLY for typing)
    const [debouncedSearch, setDebouncedSearch] = React.useState('')

    const requestId = React.useRef(0)

    // debounce search ONLY
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1)
            setDebouncedSearch(search)
        }, 350)

        return () => clearTimeout(timer)
    }, [search])

    // SINGLE FETCH SYSTEM (NO DUPLICATION)
    const fetchEvents = React.useCallback(async () => {
        const id = ++requestId.current

        setLoading(true)

        try {
            const queryParams: Record<string, any> = {
                search: debouncedSearch || undefined,
                page,
                limit: 10,
            }

            if (statusFilter === 'PUBLIC' || statusFilter === 'PRIVATE') {
                queryParams.visibility = statusFilter
            } else if (statusFilter) {
                queryParams.status = statusFilter
            }

            const json = await getMyEvents(queryParams)

            if (requestId.current !== id) return

            if (json.success) {
                setEvents(json.data)
                setMeta({
                    total: json.meta.total,
                    totalPages: json.meta.totalPage,
                })
            }
        } catch {
            if (requestId.current === id) {
                toast.error('Failed to load events')
            }
        } finally {
            if (requestId.current === id) {
                setLoading(false)
            }
        }
    }, [debouncedSearch, statusFilter, page])

    // ONLY ONE FETCH TRIGGER
    React.useEffect(() => {
        fetchEvents()
    }, [fetchEvents])

    const handleDelete = async () => {
        if (!deleteModal.eventId) return;

        const eventId = deleteModal.eventId;

        setDeletingId(eventId);

        try {
            const res = await deleteEvent(eventId);
            // console.log(res)
            if (res.success) {

                // Remove deleted event locally
                setEvents((prev) =>
                    prev.filter((event) => event.id !== eventId)
                );

                // Update total count
                setMeta((prev) => ({
                    ...prev,
                    total: prev.total - 1,
                }));

                toast.success('Event deleted');

                setDeleteModal({
                    open: false,
                    eventId: null,
                    title: '',
                });

            } else {
                toast.error(res.message || 'Failed to delete');
            }
        } catch (error: any) {
            toast.error(error?.message || 'Something went wrong');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="p-6 max-w-full">
            <button
                type="button"
                onClick={() => router.back()}
                className="mb-2 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 transition hover:text-indigo-700 cursor-pointer"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </button>
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        My Events
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {meta.total} total events
                    </p>
                </div>

                <Link href="/dashboard/create-event">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 h-10 px-5 font-bold rounded-xl w-full sm:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Event
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <MyEventsFilters
                search={search}
                statusFilter={statusFilter}
                onSearchChange={setSearch}
                onStatusChange={(val) => {
                    setStatusFilter(val)
                    setPage(1)
                }}
            />

            {/* Content */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
                </div>
            ) : events.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-sm border rounded-xl bg-white">
                    No events found
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {events.map((event) => (
                        <MyEventCard
                            key={event.id}
                            event={event}
                            onDeleteClick={(id, title) =>
                                setDeleteModal({
                                    open: true,
                                    eventId: id,
                                    title,
                                })
                            }
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {meta.totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span>
                        Page {page} of {meta.totalPages}
                    </span>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1.5 border rounded-lg disabled:opacity-40"
                        >
                            Previous
                        </button>

                        <button
                            onClick={() =>
                                setPage((p) =>
                                    Math.min(p + 1, meta.totalPages)
                                )
                            }
                            disabled={page === meta.totalPages}
                            className="px-3 py-1.5 border rounded-lg disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            <DeleteConfirmModal
                isOpen={deleteModal.open}
                isDeleting={deletingId !== null}
                onClose={() =>
                    setDeleteModal({
                        open: false,
                        eventId: null,
                        title: '',
                    })
                }
                onConfirm={handleDelete}
            />
        </div>
    )
}