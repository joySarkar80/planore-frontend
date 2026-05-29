'use client'

import * as React from 'react'
import Link from 'next/link'
import {
    ArrowLeft,
    Calendar,
    Loader2,
    Mail,
} from 'lucide-react'
import { toast } from 'sonner'

import { fmt } from '@/lib/utils'
import { getEventById } from '@/services/events'
import { getInvitedUsersService } from '@/services/invite'
import { InvitedRegistrationType } from '@/types/invite'

type InvitedUsersContainerProps = {
    eventId: string
}

export default function InvitedUsersContainer({
    eventId,
}: InvitedUsersContainerProps) {
    const [event, setEvent] = React.useState<any>(null)
    const [invitations, setInvitations] = React.useState<
        InvitedRegistrationType[]
    >([])

    const [loading, setLoading] = React.useState(true)

    // =========================
    // Fetch Data
    // =========================
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                const [eventResponse, invitedResponse] =
                    await Promise.all([
                        getEventById(eventId),
                        getInvitedUsersService(eventId),
                    ])

                // Event
                if (eventResponse?.success) {
                    setEvent(eventResponse.data)
                } else {
                    toast.error('Failed to load event');
                }

                // Invitations
                if (invitedResponse?.success) {
                    setInvitations(invitedResponse.data || [])
                } else {
                    toast.error(
                        invitedResponse?.message ||
                        'Failed to load invitations'
                    )
                }
            } catch (error) {
                console.error(error)
                toast.error('Something went wrong')
            } finally {
                setLoading(false)
            }
        }

        if (eventId) {
            fetchData()
        }

        window.scrollTo(0, 0)
    }, [eventId])

    // =========================
    // Loading State
    // =========================
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            </div>
        )
    }

    // =========================
    // UI
    // =========================
    return (
        <div className="mx-auto max-w-5xl space-y-6 p-4">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Link
                        href="/dashboard/my-events"
                        className="mb-2 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>

                    <h1 className="text-2xl font-bold text-slate-900">
                        Invited Guest List
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Monitor invitation status and participant
                        responses in realtime.
                    </p>
                </div>
            </div>

            {/* Event Info */}
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:flex-row md:items-center">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-800">
                        {event?.title}
                    </h2>
                </div>

                <div className="w-fit rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Event Date & Time
                    </span>

                    <span className="text-sm font-bold text-slate-700">
                        {fmt(event?.startAt, 'date')} ·{' '}
                        {fmt(event?.startAt, 'time')}
                    </span>
                </div>
            </div>

            {/* Invitations Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead className="border-b border-slate-200 bg-slate-50">
                            <tr>
                                <th className="p-4 text-sm font-bold text-slate-700">
                                    User
                                </th>

                                <th className="p-4 text-sm font-bold text-slate-700">
                                    Email
                                </th>

                                <th className="p-4 text-sm font-bold text-slate-700">
                                    Invited On
                                </th>

                                <th className="p-4 text-right text-sm font-bold text-slate-700">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {!invitations.length ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="py-14 text-center text-sm font-medium text-slate-400"
                                    >
                                        No invitations sent yet for
                                        this event.
                                    </td>
                                </tr>
                            ) : (
                                invitations.map((invite) => (
                                    <tr
                                        key={invite.id}
                                        className="transition hover:bg-slate-50"
                                    >
                                        {/* User */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                {invite.user.avatar ? (
                                                    <img
                                                        src={
                                                            invite.user
                                                                .avatar
                                                        }
                                                        alt={
                                                            invite.user
                                                                .name
                                                        }
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-sm font-bold text-purple-600">
                                                        {invite.user.name
                                                            .slice(
                                                                0,
                                                                2
                                                            )
                                                            .toUpperCase()}
                                                    </div>
                                                )}

                                                <span className="font-bold text-slate-800">
                                                    {
                                                        invite.user
                                                            .name
                                                    }
                                                </span>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td className="p-4 text-sm font-medium text-slate-600">
                                            <span className="flex items-center gap-1.5">
                                                <Mail className="h-4 w-4 text-slate-400" />
                                                {
                                                    invite.user
                                                        .email
                                                }
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td className="p-4 text-sm font-medium text-slate-600">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4 text-slate-400" />

                                                {fmt(
                                                    invite.createdAt,
                                                    'date'
                                                )}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="p-4 text-right">
                                            <StatusBadge
                                                status={
                                                    invite.status
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

// =========================
// Status Badge
// =========================
function StatusBadge({
    status,
}: {
    status: string
}) {
    const styles: Record<string, string> = {
        INVITED:
            'bg-purple-50 text-purple-700 border-purple-200',

        PENDING:
            'bg-amber-50 text-amber-700 border-amber-200',

        APPROVED:
            'bg-emerald-50 text-emerald-700 border-emerald-200',

        REJECTED:
            'bg-rose-50 text-rose-700 border-rose-200',

        BANNED:
            'bg-red-50 text-red-700 border-red-200',
    }

    return (
        <span
            className={`inline-flex items-center rounded-xl border px-3 py-1.5 text-xs font-bold tracking-wide ${styles[status] || 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
        >
            {status}
        </span>
    )
}