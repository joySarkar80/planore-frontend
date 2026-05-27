'use client'

import * as React from 'react'
import { Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

import { EventSearch } from './EventSearch'
import { EventFilters } from './EventFilters'
import { EventCard } from './EventCard'
import { getAllEvents } from '@/services/events'

const CATEGORIES = ["All", "Public Free", "Public Paid", "Private Free", "Private Paid"] as const
type Category = typeof CATEGORIES[number]

// URL params → tab name
function tabFromParams(visibility: string | null, isFree: string | null): Category {
    if (visibility === 'PUBLIC' && isFree === 'true') return 'Public Free'
    if (visibility === 'PUBLIC' && isFree === 'false') return 'Public Paid'
    if (visibility === 'PRIVATE' && isFree === 'true') return 'Private Free'
    if (visibility === 'PRIVATE' && isFree === 'false') return 'Private Paid'
    return 'All'
}

// tab name → API filters
function filtersFromTab(tab: Category) {
    switch (tab) {
        case 'Public Free': return { visibility: 'PUBLIC', isFree: 'true' }
        case 'Public Paid': return { visibility: 'PUBLIC', isFree: 'false' }
        case 'Private Free': return { visibility: 'PRIVATE', isFree: 'true' }
        case 'Private Paid': return { visibility: 'PRIVATE', isFree: 'false' }
        default: return {}
    }
}

export default function EventsContainer() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    // URL params থেকে initial state নাও
    const initialTab = tabFromParams(
        searchParams.get('visibility'),
        searchParams.get('isFree')
    )

    const [searchQuery, setSearchQuery] = React.useState('')
    const [activeTab, setActiveTab] = React.useState<Category>(initialTab)
    const [events, setEvents] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(true)

    // Tab change হলে URL update করো (browser back/forward কাজ করবে)
    const handleTabChange = (tab: Category) => {
        setActiveTab(tab)

        const params = new URLSearchParams()
        const filters = filtersFromTab(tab)
        if (filters.visibility) params.set('visibility', filters.visibility)
        if (filters.isFree) params.set('isFree', filters.isFree)

        const query = params.toString()
        router.replace(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
    }

    const fetchEvents = React.useCallback(async () => {
        setLoading(true)
        try {
            const filters = filtersFromTab(activeTab)
            const res = await getAllEvents({ search: searchQuery, upcoming: 'true', ...filters })
            setEvents(res?.data?.data ?? res?.data ?? [])
        } catch {
            setEvents([])
        } finally {
            setLoading(false)
        }
    }, [activeTab, searchQuery])

    React.useEffect(() => {
        const id = setTimeout(fetchEvents, 400)
        return () => clearTimeout(id)
    }, [fetchEvents])

    const handleReset = () => {
        setSearchQuery('')
        handleTabChange('All')
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4">
                <EventSearch value={searchQuery} onChange={setSearchQuery} />

                <EventFilters
                    activeTab={activeTab}
                    setActiveTab={handleTabChange}
                    categories={CATEGORIES as unknown as string[]}
                />

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
                        <h3 className="text-xl font-bold text-slate-700">No events found</h3>
                        <p className="text-slate-400 text-sm mt-2 mb-4">
                            Try a different category or search term
                        </p>
                        <Button variant="outline" onClick={handleReset}>
                            Reset Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}