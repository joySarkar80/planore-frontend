'use client'

import * as React from 'react'
import { MOCK_EVENTS, Event } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Users,
  Calendar,
  Edit2,
  Trash2,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MyEventsPage() {
  // Mock filter: events where Joy is organizer
  const myEvents = MOCK_EVENTS.filter(e => e.organizerId === "joy123")

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Events</h1>
          <p className="text-slate-500 font-medium">Manage events you&apos;ve created and their participants.</p>
        </div>
        <Link href="/dashboard/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700 h-12 px-6 font-bold rounded-xl shadow-lg shadow-indigo-100">
            <Plus className="h-5 w-5 mr-2" /> Create New Event
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {myEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden border-slate-200/60 transition-shadow hover:shadow-md bg-white rounded-2xl">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-slate-900 hover:bg-white border-none shadow-sm font-bold">
                      {event.category}
                    </Badge>
                  </div>
                </div>

                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex items-center text-sm font-bold text-slate-400 gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-indigo-500" /> {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5 text-indigo-500" /> {event.participants.length} Participants
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-slate-50 transition-colors">
                          <MoreVertical className="h-5 w-5 text-slate-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                          <DropdownMenuItem className="rounded-lg font-bold py-2">
                            <Edit2 className="h-4 w-4 mr-3" /> Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg font-bold py-2 text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4 mr-3" /> Delete Event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-slate-500 line-clamp-2 text-sm font-medium mb-6">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link href={`/events/${event.id}`}>
                      <Button variant="outline" className="h-10 px-4 rounded-lg font-bold border-slate-200">
                        <ExternalLink className="h-4 w-4 mr-2" /> Public View
                      </Button>
                    </Link>
                    <Button className="h-10 px-4 rounded-lg font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border-none">
                      Manage Participants
                    </Button>
                    {event.pendingRequests.length > 0 && (
                      <Button className="h-10 px-4 rounded-lg font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 border-none">
                        {event.pendingRequests.length} Pending Requests
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
