import { Suspense } from 'react'
import EventsContainer from '../_component/page/events/all-events/EventsContainer'
import { Loader2 } from 'lucide-react'

export default function EventsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      }
    >
      <EventsContainer />
    </Suspense>
  )
}