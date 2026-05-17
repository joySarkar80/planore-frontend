'use client'
import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  Plus, Users, Calendar, Edit2, Trash2, ExternalLink, Loader2
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

import { getMyEvents, deleteEvent } from '@/services/events/clientEvent'

type EventType = {
  id: string
  title: string
  description: string
  startAt: string
  venue?: string
  visibility: 'PUBLIC' | 'PRIVATE'
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  imageUrl?: string
  registrations: []
}

export default function MyEventsPage() {
  const [events, setEvents] = React.useState<EventType[]>([])
  const [loading, setLoading] = React.useState(true)

  // Delete Modal States
  const [eventToDelete, setEventToDelete] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getMyEvents()
        setEvents(data?.data || [])
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // ডিলিট কনফার্মেশন হ্যান্ডলার
  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return;

    try {
      setIsDeleting(true)
      const res = await deleteEvent(eventToDelete)

      if (res.success) {
        toast.success("Event deleted successfully")
        // লোকাল স্টেট থেকে ডিলিট করা ইভেন্ট রিমুভ করা (Instant UI Update)
        setEvents(prev => prev.filter(event => event.id !== eventToDelete))
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete event")
    } finally {
      setIsDeleting(false)
      setEventToDelete(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg font-bold text-slate-500">Loading events...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Events</h1>
          <p className="text-slate-500 font-medium">Manage events you&apos;ve created and participants.</p>
        </div>
        <Link href="/dashboard/create-event">
          <Button className="bg-indigo-600 hover:bg-indigo-700 h-12 px-6 font-bold rounded-xl">
            <Plus className="h-5 w-5 mr-2" />
            Create Event
          </Button>
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="flex items-center justify-center h-[40vh] border rounded-2xl bg-white">
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-800">No Events Found</h2>
            <p className="text-slate-500 mt-2">You haven&apos;t created any event yet.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden border-slate-200/60 hover:shadow-md transition-shadow rounded-2xl">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-64 h-52 shrink-0">
                    <Image
                      src={event.imageUrl || 'https://images.unsplash.com/photo-1511578314322-379afb476865'}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white text-slate-900 font-bold">{event.visibility}</Badge>
                    </div>
                  </div>
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-2xl font-black text-slate-900">{event.title}</h2>
                          <div className="flex items-center gap-4 text-sm text-slate-500 font-semibold mt-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-indigo-500" />
                              {new Date(event.startAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-indigo-500" />
                              {event.registrations?.length} Participants
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-500 line-clamp-2">{event.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">
                      <Link href={`/events/${event.id}`}>
                        <Button variant="outline" className="rounded-xl font-bold">
                          <ExternalLink className="h-4 w-4 mr-2" /> View
                        </Button>
                      </Link>
                      <Link href={`/dashboard/edit-event/${event.id}`}>
                        <Button className="rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700">
                          <Edit2 className="h-4 w-4 mr-2" /> Edit
                        </Button>
                      </Link>

                      {/* Delete Trigger Button */}
                      <Button
                        onClick={() => setEventToDelete(event.id)}
                        className="rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </Button>

                      <Button className="rounded-xl font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
                        Manage Participants
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal Overlay */}
      {eventToDelete && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                <Trash2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Delete Event?</h3>
              <p className="text-slate-500 font-medium">
                Are you sure you want to delete this event? This action cannot be undone and all registrations will be removed.
              </p>

              <div className="flex gap-3 w-full mt-6">
                <Button
                  variant="outline"
                  onClick={() => setEventToDelete(null)}
                  disabled={isDeleting}
                  className="flex-1 rounded-xl h-12 font-bold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="flex-1 rounded-xl h-12 font-bold bg-red-600 hover:bg-red-700 text-white"
                >
                  {isDeleting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Confirm Delete"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}