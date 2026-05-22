'use client'

import * as React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EventInfo } from '../../_component/page/events/event-details/EventInfo'
import { ActionSidebar } from '../../_component/page/events/event-details/ActionSidebar'
import { getEventById } from '@/services/events/clientEvent'

export default function EventDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string

  const [event, setEvent] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true)
        const response = await getEventById(eventId)
        if (response.success && response.data) {
          setEvent(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch event:", error)
      } finally {
        setLoading(false)
      }
    }

    if (eventId) fetchEvent()
    window.scrollTo(0, 0);
  }, [eventId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    )
  }

  const isPaid = Number(event.registrationFee) > 0;
  const categoryLabel = `${event.visibility} ${isPaid ? 'PAID' : 'FREE'}`;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Banner */}
      <div className="relative h-[35vh] min-h-[260px] w-full overflow-hidden bg-gradient-to-tr from-slate-900 to-indigo-950">
        <div className="absolute top-6 left-6 z-10">
          <Button
            variant="ghost"
            className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/10"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5 mr-1" /> Back
          </Button>
        </div>

        <div className="absolute bottom-10 left-0 w-full z-10">
          <div className="container mx-auto px-4">
            <Badge className="bg-indigo-600 text-white mb-4 border-none shadow-md px-3 py-1 font-bold">
              {categoryLabel}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter capitalize">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EventInfo event={event} />
          </div>
          <div>
            <ActionSidebar event={event} />
          </div>
        </div>
      </div>
    </div>
  )
}