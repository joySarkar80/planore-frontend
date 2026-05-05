'use client'

import * as React from 'react'
import { MOCK_EVENTS } from '@/lib/mock-data'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Filter,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [activeTab, setActiveTab] = React.useState('All')

  const filteredEvents = MOCK_EVENTS.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === 'All') return matchesSearch
    return matchesSearch && event.category === activeTab
  })

  const categories = ["All", "Public Free", "Public Paid", "Private Free", "Private Paid"]

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header and Search */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-center">Discover Events</h1>
          <p className="text-slate-500 text-center max-w-2xl mx-auto mb-8">
            Find and join the best upcoming events in your community.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search by event title or organizer..."
              className="pl-12 h-14 bg-white shadow-sm border-slate-200 rounded-2xl focus-visible:ring-indigo-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col items-center gap-6 mb-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl">
            <TabsList className="w-full h-auto p-1 bg-white border border-slate-200 rounded-xl flex flex-wrap justify-center sm:justify-start">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="px-6 py-2 rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-semibold transition-all"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Event Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="group hover:shadow-2xl transition-all duration-300 border-slate-200/60 overflow-hidden bg-white rounded-2xl">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-slate-900 hover:bg-white font-bold backdrop-blur-sm border-none shadow-sm">
                      {event.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      <Calendar className="h-3 w-3 mr-1" />
                      {event.date}
                    </div>
                    <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 border-indigo-100">
                      {event.fee === 0 ? 'Free' : `$${event.fee}`}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-3 mb-8 border-t border-slate-50 pt-6">
                    <div className="flex items-center text-sm text-slate-600 font-medium">
                      <Users className="h-4 w-4 mr-3 text-indigo-500" />
                      <span className="truncate">Organizer: {event.organizer}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 font-medium">
                      <MapPin className="h-4 w-4 mr-3 text-indigo-500" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>

                  <Link href={`/events/${event.id}`}>
                    <Button className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold h-12 rounded-xl transition-all shadow-md active:scale-[0.98]">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No events found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters to find what you&apos;re looking for.</p>
            <Button
              variant="outline"
              className="mt-6 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              onClick={() => {
                setSearchQuery('')
                setActiveTab('All')
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
