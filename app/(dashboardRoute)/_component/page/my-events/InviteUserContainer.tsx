'use client'

import * as React from 'react'
import Link from 'next/link'
import {
    ArrowLeft,
    CheckCircle,
    Loader2,
    Search,
    UserPlus,
} from 'lucide-react'
import { toast } from 'sonner'

import { fmt } from '@/lib/utils'
import { getEventById } from '@/services/events'
import {
    inviteUserService,
    searchUsersService,
} from '@/services/invite'
import { SearchUserType } from '@/types/invite'

type InviteUserContainerProps = {
    eventId: string
    currentUserEmail: string
}

export default function InviteUserContainer({
    eventId,
    currentUserEmail,
}: InviteUserContainerProps) {
    const [searchTerm, setSearchTerm] = React.useState('')
    const [users, setUsers] = React.useState<SearchUserType[]>([])

    const [event, setEvent] = React.useState<any>(null)

    const [loading, setLoading] = React.useState(true)
    const [isSearching, setIsSearching] = React.useState(false)
    const [invitingId, setInvitingId] = React.useState<string | null>(null)

    // =========================
    // Fetch Event
    // =========================
    React.useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true)

                const response = await getEventById(eventId)

                if (response?.success) {
                    setEvent(response.data)
                }
            } catch (error) {
                console.error(error)
                toast.error('Failed to load event')
            } finally {
                setLoading(false)
            }
        }

        if (eventId) {
            fetchEvent()
        }

        window.scrollTo(0, 0)
    }, [eventId])

    // =========================
    // Search Users
    // =========================
    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!searchTerm.trim()) {
            toast.error('Please enter name or email')
            return
        }

        try {
            setIsSearching(true)

            const response = await searchUsersService(
                searchTerm,
                eventId
            )

            if (!response.success) {
                toast.error(response.message || 'User not found')
                setUsers([])
                return
            }

            if (response.data.length === 0) {
                toast.error('No users found matching your search');
            } else {
                toast.success(`Found ${response.data.length} users`);
            }

            setUsers(response.data || [])
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong')
        } finally {
            setIsSearching(false)
        }
    }

    // =========================
    // Invite User
    // =========================
    const handleInvite = async (
        userEmail: string,
        userId: string
    ) => {
        if (userEmail === currentUserEmail) {
            toast.error('You cannot invite yourself')
            return
        }

        try {
            setInvitingId(userId)

            const response = await inviteUserService(
                eventId,
                userEmail
            )

            if (!response.success) {
                toast.error(response.message)
                return
            }

            toast.success('Invitation sent successfully')

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId
                        ? {
                            ...user,
                            registrationStatus: 'INVITED',
                        }
                        : user
                )
            )
        } catch (error) {
            console.error(error)
            toast.error('Failed to invite user')
        } finally {
            setInvitingId(null)
        }
    }

    // =========================
    // Loading State
    // =========================
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
            </div>
        )
    }

    // =========================
    // UI
    // =========================
    return (
        <div className="mx-auto max-w-5xl space-y-6 p-4">
            {/* Header */}
            <div>
                <Link
                    href="/dashboard/my-events"
                    className="mb-2 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>

                <h1 className="text-2xl font-bold text-slate-900">
                    Invite Users
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Search users by name or email and invite them to
                    your event.
                </p>
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

            {/* Search Form */}
            <form
                onSubmit={handleSearch}
                className="flex flex-col gap-3 sm:flex-row"
            >
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        className="h-12 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSearching}
                    className="flex h-12 min-w-[120px] items-center justify-center rounded-xl bg-indigo-600 px-6 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isSearching ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        'Search'
                    )}
                </button>
            </form>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="p-4 text-sm font-bold text-slate-700">
                                    User
                                </th>

                                <th className="p-4 text-sm font-bold text-slate-700">
                                    Email
                                </th>

                                <th className="p-4 text-right text-sm font-bold text-slate-700">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {!users.length ? (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="py-14 text-center text-sm font-medium text-slate-400"
                                    >
                                        No users found. Search for a
                                        user to invite.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => {
                                    const isSelf =
                                        user.email ===
                                        currentUserEmail

                                    return (
                                        <tr
                                            key={user.id}
                                            className="transition hover:bg-slate-50"
                                        >
                                            {/* User */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-indigo-100 bg-indigo-50 text-sm font-bold text-indigo-600">
                                                        {user.avatar ? (
                                                            <img
                                                                src={
                                                                    user.avatar
                                                                }
                                                                alt={
                                                                    user.name
                                                                }
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            user.name
                                                                .slice(
                                                                    0,
                                                                    2
                                                                )
                                                                .toUpperCase()
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-slate-800">
                                                            {
                                                                user.name
                                                            }
                                                        </span>

                                                        {isSelf && (
                                                            <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                                                                You
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="p-4 text-sm font-medium text-slate-600">
                                                {user.email}
                                            </td>

                                            {/* Action */}
                                            <td className="p-4 text-right">
                                                {isSelf ? (
                                                    <span className="pr-2 text-sm font-bold text-slate-400">
                                                        Unavailable
                                                    </span>
                                                ) : user.registrationStatus ? (
                                                    <StatusBadge
                                                        status={
                                                            user.registrationStatus
                                                        }
                                                    />
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleInvite(
                                                                user.email,
                                                                user.id
                                                            )
                                                        }
                                                        disabled={
                                                            invitingId !==
                                                            null
                                                        }
                                                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-60"
                                                    >
                                                        {invitingId ===
                                                            user.id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <>
                                                                <UserPlus className="h-4 w-4" />
                                                                Invite
                                                            </>
                                                        )}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

// =========================
// Status Badge Component
// =========================
function StatusBadge({
    status,
}: {
    status: SearchUserType['registrationStatus']
}) {
    switch (status) {
        case 'INVITED':
            return (
                <div className="flex justify-end">
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700">
                        <CheckCircle className="h-4 w-4" />
                        Invited
                    </span>
                </div>
            )

        case 'PENDING':
            return (
                <div className="flex justify-end">
                    <span className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                        Already Registered (Pending)
                    </span>
                </div>
            )

        case 'APPROVED':
            return (
                <div className="flex justify-end">
                    <span className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                        Already Registered (Approved)
                    </span>
                </div>
            )

        case 'REJECTED':
        case 'BANNED':
            return (
                <div className="flex justify-end">
                    <span className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700">
                        Rejected
                    </span>
                </div>
            )

        default:
            return null
    }
}