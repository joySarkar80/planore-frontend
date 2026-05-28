'use client'

import * as React from 'react'
import { Loader2, Mail, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { getInvitedUsersService } from '@/services/invite'
import { InvitedRegistrationType } from '@/types/invite'

type InvitedUsersContainerProps = {
    eventId: string
}

export default function InvitedUsersContainer({ eventId }: InvitedUsersContainerProps) {
    const [invitations, setInvitations] = React.useState<InvitedRegistrationType[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchInvitedUsers = async () => {
            setIsLoading(true)
            const response = await getInvitedUsersService(eventId)

            if (response.success) {
                setInvitations(response.data)
            } else {
                toast.error(response.message || 'Error loading guest list')
            }
            setIsLoading(false)
        }

        fetchInvitedUsers()
    }, [eventId])

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            INVITED: 'bg-purple-50 text-purple-700 border-purple-200',
            PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
            APPROVED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            REJECTED: 'bg-rose-50 text-rose-700 border-rose-200',
        }
        return (
            <span className={`inline-flex items-center border px-2.5 py-1 rounded-xl text-xs font-bold tracking-wide ${styles[status] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                {status}
            </span>
        )
    }

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <Link href="/dashboard/my-events" className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 mb-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Events
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Invited Guest List</h1>
                    <p className="text-slate-500 mt-1">Monitor realtime outbound invitations and acceptance states.</p>
                </div>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="p-4 font-bold text-slate-700 text-sm">User</th>
                                <th className="p-4 font-bold text-slate-700 text-sm">Email</th>
                                <th className="p-4 font-bold text-slate-700 text-sm">Invited On</th>
                                <th className="p-4 font-bold text-slate-700 text-sm text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {invitations.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-12 text-slate-400 font-medium">
                                        No invitations sent out yet for this event.
                                    </td>
                                </tr>
                            ) : (
                                invitations.map((invite) => (
                                    <tr key={invite.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                {invite.user.avatar ? (
                                                    <img
                                                        src={invite.user.avatar}
                                                        alt={invite.user.name}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 flex items-center justify-center rounded-full font-bold bg-purple-50 text-purple-600 text-sm">
                                                        {invite.user.name.slice(0, 2).toUpperCase()}
                                                    </div>
                                                )}
                                                <span className="font-bold text-slate-800">{invite.user.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-600 font-semibold text-sm">
                                            <span className="flex items-center gap-1.5">
                                                <Mail className="h-4 w-4 text-slate-400" />
                                                {invite.user.email}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-600 font-semibold text-sm">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4 text-slate-400" />
                                                {new Date(invite.createdAt).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            Invited and event join status is {getStatusBadge(invite.status)}
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