'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Users, Edit2, Trash2, ExternalLink, UserPlus, MailCheck } from 'lucide-react'
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
        <Card className="overflow-hidden rounded-2xl border border-slate-200/60 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
                <div className="flex flex-col">
                    <div className="flex-1 p-6 md:p-8">
                        <div>
                            <Badge
                                variant="secondary"
                                className="mb-3 w-fit rounded-full px-3 py-1 font-bold"
                            >
                                {event.visibility}
                            </Badge>

                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 break-words">
                                        {event.title}
                                    </h2>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-semibold mt-2">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4 text-indigo-500" />
                                            {new Date(event.startAt).toLocaleDateString()}
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <Users className="h-4 w-4 text-indigo-500" />
                                            {event.registrations?.length || 0} Participants
                                        </span>

                                        <span className="text-slate-400">
                                            Status:{" "}
                                            <span className="font-bold text-slate-700">
                                                {event.status}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-slate-500 leading-relaxed line-clamp-2">
                                {event.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-6">
                            <Link href={`/events/${event.id}`}>
                                <Button className="rounded-xl font-bold bg-slate-800 hover:bg-slate-950 text-white">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    View
                                </Button>
                            </Link>

                            <Link href={`/dashboard/edit-event/${event.id}`}>
                                <Button
                                    className="rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700"
                                    title="Edit event details"
                                >
                                    <Edit2 className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </Link>

                            <Button
                                title="Delete event"
                                onClick={() => onDeleteTrigger(event.id)}
                                className="rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>

                            <Link href={`/dashboard/my-events/participants/${event.id}`}>
                                <Button
                                    className="rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white"
                                    title="Manage participants"
                                >
                                    <Users className="h-4 w-4 mr-2" />
                                    Participants
                                </Button>
                            </Link>

                            <Link href={`/dashboard/my-events/invite/${event.id}`}>
                                <Button
                                    title="Invite user to join this event"
                                    className="rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Invite User
                                </Button>
                            </Link>

                            <Link href={`/dashboard/my-events/invited/${event.id}`}>
                                <Button
                                    title="List of users invited so far"
                                    className="rounded-xl font-bold bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    <MailCheck className="h-4 w-4 mr-2" />
                                    Invited Users
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}