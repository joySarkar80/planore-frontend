'use client'

import Link from 'next/link'
import { Calendar, Users, Edit2, Trash2, ExternalLink, UserPlus, MailCheck, MapPin, DollarSign } from 'lucide-react'

export type EventStatus = 'APPROVED' | 'REJECTED' | 'PENDING'
export type EventVisibility = 'PUBLIC' | 'PRIVATE'

export type MyEvent = {
    id: string
    title: string
    description: string
    startAt: string
    createdAt: string
    venue?: string
    status: EventStatus
    visibility: EventVisibility
    registrationFee: string | number
    participantCount: number
    _count?: { reviews: number }
}

const STATUS_BADGE: Record<EventStatus, string> = {
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
}

const VISIBILITY_BADGE: Record<EventVisibility, string> = {
    PUBLIC: 'bg-blue-100 text-blue-700',
    PRIVATE: 'bg-purple-100 text-purple-700',
}

type MyEventCardProps = {
    event: MyEvent
    onDeleteClick: (id: string, title: string) => void
}

export default function MyEventCard({ event, onDeleteClick }: MyEventCardProps) {
    const isFree = Number(event.registrationFee) === 0

    const fmt = (d: string) =>
        new Date(d).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })

    const fmtTime = (d: string) =>
        new Date(d).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="p-5">
                {/* Top Row: title + badges */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="min-w-0">
                        <h2 className="text-base font-bold text-gray-900 truncate">{event.title}</h2>
                        <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">{event.description}</p>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-shrink-0 items-center gap-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${STATUS_BADGE[event.status]}`}>
                            {event.status}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${VISIBILITY_BADGE[event.visibility]}`}>
                            {event.visibility}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${isFree ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            {isFree ? 'Free' : `৳${Number(event.registrationFee).toLocaleString()}`}
                        </span>
                    </div>
                </div>

                {/* Meta info row */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                        {fmt(event.startAt)} · {fmtTime(event.startAt)}
                    </span>
                    {event.venue && (
                        <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                            <span className="truncate max-w-[160px]">{event.venue}</span>
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-indigo-400" />
                        {event.participantCount} participants
                    </span>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2">
                    <Link href={`/events/${event.id}`}>
                        <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition-colors">
                            <ExternalLink className="h-3.5 w-3.5" />
                            View
                        </button>
                    </Link>

                    <Link href={`/dashboard/edit-event/${event.id}`}>
                        <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                            <Edit2 className="h-3.5 w-3.5" />
                            Edit
                        </button>
                    </Link>

                    <Link href={`/dashboard/my-events/participants/${event.id}`}>
                        <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                            <Users className="h-3.5 w-3.5" />
                            Manage Participants
                        </button>
                    </Link>

                    <Link href={`/dashboard/my-events/invite/${event.id}`}>
                        <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                            <UserPlus className="h-3.5 w-3.5" />
                            Invite User
                        </button>
                    </Link>

                    <Link href={`/dashboard/my-events/invited/${event.id}`}>
                        <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                            <MailCheck className="h-3.5 w-3.5" />
                            Invited Users
                        </button>
                    </Link>

                    <button
                        onClick={() => onDeleteClick(event.id, event.title)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}