'use client'

import * as React from 'react'
import Link from 'next/link'
import { Plus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

import { getMyEvents, deleteEvent } from '@/services/events'
import MyEventCard, { EventType } from '../../../_component/page/my-events/MyEventCard'
import DeleteConfirmModal from '../../../_component/page/my-events/DeleteConfirmModal'

export default function MyEventsPage() {
  const [events, setEvents] = React.useState<EventType[]>([])
  const [loading, setLoading] = React.useState(true)

  // Delete State Management
  const [eventToDelete, setEventToDelete] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getMyEvents()
        setEvents(data?.data || [])
      } catch (error) {
        console.error('Error fetching events:', error)
        toast.error('Failed to load events')
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return

    try {
      setIsDeleting(true)
      const res = await deleteEvent(eventToDelete)

      if (res.success) {
        toast.success('Event deleted successfully')
        // Optimistic UI update: রিলোড ছাড়া সরাসরি স্টেট থেকে বাদ দেওয়া
        setEvents((prev) => prev.filter((event) => event.id !== eventToDelete))
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete event')
    } finally {
      setIsDeleting(false)
      setEventToDelete(null)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        <p className="text-lg font-bold text-slate-500">Loading events...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 relative">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            My Events
          </h1>
          <p className="text-slate-500 font-medium">
            Manage events you&apos;ve created and participants.
          </p>
        </div>
        <Link href="/dashboard/create-event">
          <Button className="bg-indigo-600 hover:bg-indigo-700 h-12 px-6 font-bold rounded-xl">
            <Plus className="h-5 w-5 mr-2" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* EVENTS CONTAINER LIST */}
      {events.length === 0 ? (
        <div className="flex items-center justify-center h-[40vh] border rounded-2xl bg-white">
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-800">No Events Found</h2>
            <p className="text-slate-500 mt-2">
              You haven&apos;t created any event yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {events.map((event) => (
            <MyEventCard
              key={event.id}
              event={event}
              onDeleteTrigger={(id) => setEventToDelete(id)}
            />
          ))}
        </div>
      )}

      {/* CONDITIONAL MODAL RENDERING */}
      <DeleteConfirmModal
        isOpen={Boolean(eventToDelete)}
        isDeleting={isDeleting}
        onClose={() => setEventToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}