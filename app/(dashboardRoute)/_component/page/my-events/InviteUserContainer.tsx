'use client'

import * as React from 'react'
import { Search, Loader2, CheckCircle, UserPlus, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { inviteUserService, searchUsersService } from '@/services/invite'
import Link from 'next/link'
import { SearchUserType } from '@/types/invite'

type InviteUserContainerProps = {
    eventId: string
    currentUserEmail: string
}

export default function InviteUserContainer({ eventId, currentUserEmail }: InviteUserContainerProps) {
    const [searchTerm, setSearchTerm] = React.useState('')
    const [users, setUsers] = React.useState<SearchUserType[]>([])
    const [isSearching, setIsSearching] = React.useState(false)
    const [invitingId, setInvitingId] = React.useState<string | null>(null)

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchTerm.trim()) {
            toast.error('Please type a name or email')
            return
        }

        setIsSearching(true)
        const response = await searchUsersService(searchTerm, eventId)

        if (response.success) {
            setUsers(response.data)
        } else {
            toast.error(response.message || 'User not found')
        }
        setIsSearching(false)
    }

    const handleInvite = async (userEmail: string, userId: string) => {
        if (userEmail === currentUserEmail) {
            toast.error('You cannot invite yourself!')
            return
        }

        setInvitingId(userId)

        const response = await inviteUserService(eventId, userEmail)

        if (response.success) {
            toast.success('User invited successfully!')
            setUsers(prevUsers =>
                prevUsers.map(u =>
                    u.id === userId
                        ? { ...u, registrationStatus: 'INVITED' }
                        : u
                )
            )
        } else {
            toast.error(response.message)
        }
        setInvitingId(null)
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto p-4">
            <div>
                <Link href="/dashboard/my-events" className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 mb-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Events
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Invite Users</h1>
                <p className="text-slate-500 mt-1">Search for users by name or email to invite them to the event.</p>
            </div>

            <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 rounded-xl h-12 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 transition-all"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSearching}
                    className="h-12 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center justify-center min-w-[100px] disabled:opacity-70 transition-colors"
                >
                    {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Search'}
                </button>
            </form>

            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 font-bold text-slate-700 text-sm">User Profile</th>
                                <th className="p-4 font-bold text-slate-700 text-sm">Email Address</th>
                                <th className="p-4 font-bold text-slate-700 text-sm text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="text-center py-12 text-slate-400 font-medium">
                                        No records found. Please search for a user.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => {
                                    const isSelf = user.email === currentUserEmail

                                    return (
                                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4 font-medium">
                                                <div className="flex items-center gap-3">

                                                    <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-100 overflow-hidden">
                                                        {user.avatar ? (
                                                            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                                                        ) : (
                                                            user.name.slice(0, 2).toUpperCase()
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-slate-800">{user.name}</span>
                                                        {isSelf && (
                                                            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-md border border-slate-200">
                                                                You
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-600 font-semibold text-sm">
                                                {user.email}
                                            </td>
                                            <td className="p-4 text-right">
                                                {isSelf ? (
                                                    <span className="text-sm font-bold text-slate-400 pr-2">
                                                        Unavailable
                                                    </span>
                                                ) : user.registrationStatus ? (
                                                    <div className="flex justify-end">
                                                        {user.registrationStatus === 'INVITED' && (
                                                            <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-xl text-xs font-bold">
                                                                <CheckCircle className="h-4 w-4" />
                                                                Invited
                                                            </span>
                                                        )}

                                                        {user.registrationStatus === 'PENDING' && (
                                                            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold">
                                                                User already registered (Pending)
                                                            </span>
                                                        )}

                                                        {user.registrationStatus === 'APPROVED' && (
                                                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold">
                                                                User already registered (Approved)
                                                            </span>
                                                        )}

                                                        {(user.registrationStatus === 'REJECTED' ||
                                                            user.registrationStatus === 'BANNED') && (
                                                                <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-xl text-xs font-bold">
                                                                    User rejected or banned
                                                                </span>
                                                            )}
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleInvite(user.email, user.id)}
                                                        disabled={invitingId !== null}
                                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-60"
                                                    >
                                                        {invitingId === user.id ? (
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