'use client'

import * as React from 'react'
import { Loader2, ShieldOff, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { getBannedUsersService, unbanUserService } from '@/services/hostBan'
import { ConfirmModal } from '../shared/ConfirmModal'

type BannedUser = {
    id: string
    userId: string
    reason?: string
    createdAt: string
    user: {
        id: string
        name: string
        email: string
        avatar?: string
    }
}

export default function BlockedUsersContainer() {
    const [bannedUsers, setBannedUsers] = React.useState<BannedUser[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [unbanModal, setUnbanModal] = React.useState<{ userId: string; name: string } | null>(null)
    const [isUnbanning, setIsUnbanning] = React.useState(false)

    const fetchBannedUsers = React.useCallback(async () => {
        setIsLoading(true)
        const response = await getBannedUsersService()
        if (response.success) {
            setBannedUsers(response.data || [])
        } else {
            toast.error(response.message || 'Failed to fetch banned users')
        }
        setIsLoading(false)
    }, [])

    React.useEffect(() => {
        fetchBannedUsers()
    }, [fetchBannedUsers])

    const handleUnban = (userId: string, name: string) => {
        setUnbanModal({ userId, name })
    }

    const confirmUnban = async () => {
        if (!unbanModal) return
        setIsUnbanning(true)
        const response = await unbanUserService(unbanModal.userId)
        setIsUnbanning(false)
        if (response.success) {
            toast.success(`${unbanModal.name} has been unblocked successfully!`)
            setBannedUsers((prev) => prev.filter((b) => b.userId !== unbanModal.userId))
            setUnbanModal(null)
        } else {
            toast.error(response.message || 'Unblock failed')
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto p-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Blocked Users
                </h1>
                <p className="text-slate-500 mt-1">
                    Users you have blocked from joining your events.
                </p>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Reason
                                </th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Blocked At
                                </th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {bannedUsers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-16 text-slate-400 font-medium"
                                    >
                                        <ShieldCheck className="h-10 w-10 mx-auto mb-2 text-slate-300" />
                                        No users are blocked.
                                    </td>
                                </tr>
                            ) : (
                                bannedUsers.map((ban) => (
                                    <BannedUserRow
                                        key={ban.id}
                                        ban={ban}
                                        onUnban={handleUnban}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmModal
                isOpen={!!unbanModal}
                title="Unblock User"
                description={`Are you sure you want to unblock ${unbanModal?.name}? They will be able to join your upcoming events again.`}
                confirmLabel="Unblock"
                confirmClassName="bg-indigo-600 hover:bg-indigo-700 text-white"
                isLoading={isUnbanning}
                onConfirm={confirmUnban}
                onCancel={() => setUnbanModal(null)}
            />
        </div>
    )
}

function BannedUserRow({
    ban,
    onUnban,
}: {
    ban: {
        id: string
        userId: string
        reason?: string
        createdAt: string
        user: { id: string; name: string; email: string; avatar?: string }
    }
    onUnban: (userId: string, name: string) => void
}) {
    return (
        <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="p-4">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center overflow-hidden shrink-0">
                        {ban.user.avatar ? (
                            <img
                                src={ban.user.avatar}
                                alt=""
                                className="object-cover h-full w-full"
                            />
                        ) : (
                            ban.user.name.slice(0, 2).toUpperCase()
                        )}
                    </div>
                    <span className="font-bold text-slate-800">{ban.user.name}</span>
                </div>
            </td>
            <td className="p-4 text-sm text-slate-600 font-semibold">{ban.user.email}</td>
            <td className="p-4 text-sm text-slate-500">
                {ban.reason || <span className="text-slate-300 italic">No reason given</span>}
            </td>
            <td className="p-4 text-sm text-slate-500">
                {new Date(ban.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                })}
            </td>
            <td className="p-4 text-right">
                <button
                    type="button"
                    onClick={() => onUnban(ban.userId, ban.user.name)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                    <ShieldOff className="h-3.5 w-3.5" />
                    Unblock
                </button>
            </td>
        </tr>
    )
}