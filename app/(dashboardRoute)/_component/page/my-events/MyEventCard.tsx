'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Users, Edit2, Trash2, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export type EventType = {
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

type MyEventCardProps = {
    event: EventType
    onDeleteTrigger: (id: string) => void
}

export default function MyEventCard({ event, onDeleteTrigger }: MyEventCardProps) {
    return (
        <Card className="overflow-hidden border-slate-200/60 hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-64 h-52 shrink-0">
                        <Image
                            src={
                                event.imageUrl ||
                                'https://images.unsplash.com/photo-1511578314322-379afb476865'
                            }
                            alt={event.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                            <Badge className="bg-white text-slate-900 font-bold">
                                {event.visibility}
                            </Badge>
                        </div>
                    </div>
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">
                                        {event.title}
                                    </h2>
                                    <div className="flex items-center gap-4 text-sm text-slate-500 font-semibold mt-2">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4 text-indigo-500" />
                                            {new Date(event.startAt).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users className="h-4 w-4 text-indigo-500" />
                                            {event.registrations?.length || 0} Participants
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-500 line-clamp-2">{event.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-6">
                            <Link href={`/events/${event.id}`}>
                                <Button className="rounded-xl font-bold bg-slate-800 hover:bg-slate-950 text-white">
                                    <ExternalLink className="h-4 w-4 mr-2" /> View
                                </Button>
                            </Link>
                            <Link href={`/dashboard/edit-event/${event.id}`}>
                                <Button className="rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700">
                                    <Edit2 className="h-4 w-4 mr-2" /> Edit
                                </Button>
                            </Link>

                            <Button
                                onClick={() => onDeleteTrigger(event.id)}
                                className="rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white"
                            >
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </Button>

                            <Button className="rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white">
                                Manage Participants
                            </Button>
                            <p className="text-sm font-bold text-slate-400 tracking-widest mt-2">
                                Status: {event.status}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}