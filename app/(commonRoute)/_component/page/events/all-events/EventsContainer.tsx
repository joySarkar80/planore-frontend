'use client'

import * as React from 'react'
import { Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { EventSearch } from './EventSearch'
import { EventFilters } from './EventFilters'
import { EventCard } from './EventCard'
import { getAllEvents } from '@/services/events'

export default function EventsContainer() {
    const [searchQuery, setSearchQuery] = React.useState('')
    const [activeTab, setActiveTab] = React.useState('All')
    const [events, setEvents] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(true)

    const categories = ["All", "Public Free", "Public Paid", "Private Free", "Private Paid"]

    const getFiltersFromTab = (tab: string) => {
        switch (tab) {
            case "Public Free": return { visibility: "PUBLIC", isFree: "true" };
            case "Public Paid": return { visibility: "PUBLIC", isFree: "false" };
            case "Private Free": return { visibility: "PRIVATE", isFree: "true" };
            case "Private Paid": return { visibility: "PRIVATE", isFree: "false" };
            default: return {};
        }
    }

    const fetchEvents = React.useCallback(async () => {
        setLoading(true)
        const filters = getFiltersFromTab(activeTab)
        const res = await getAllEvents({ search: searchQuery, ...filters })
        if (res?.success) setEvents(res.data)
        else setEvents([])
        setLoading(false)
    }, [activeTab, searchQuery])

    React.useEffect(() => {
        const timeoutId = setTimeout(() => { fetchEvents() }, 500)
        return () => clearTimeout(timeoutId)
    }, [fetchEvents])

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4">
                <EventSearch value={searchQuery} onChange={setSearchQuery} />
                <EventFilters activeTab={activeTab} setActiveTab={setActiveTab} categories={categories} />

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                        <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-4" />
                        <p>Loading events...</p>
                    </div>
                ) : events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center">
                        <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold">No events found</h3>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => { setSearchQuery(''); setActiveTab('All'); }}
                        >
                            Reset Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}