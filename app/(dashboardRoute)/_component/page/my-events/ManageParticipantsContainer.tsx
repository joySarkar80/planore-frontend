'use client'

import * as React from 'react'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import {
    getEventParticipantsService,
    updateParticipantStatusService,
    deleteRegistrationService,
} from '@/services/registrations/clientRegistration'
import { banUserService } from '@/services/hostBan'
import { ParticipantType } from '@/types/registration'
import { ParticipantTableHeader } from './ParticipantTableHeader'
import { ParticipantRow } from './ParticipantRow'
import { ConfirmModal } from '../shared/ConfirmModal'
import { SingleEvent } from '@/types/event'
import { fmt } from '@/lib/utils'

type ManageParticipantsContainerProps = {
    eventId: string
}

type ModalState =
    | { type: 'delete'; registrationId: string }
    | { type: 'block'; userId: string; registrationId: string }
    | null

export default function ManageParticipantsContainer({
    eventId,
}: ManageParticipantsContainerProps) {
    const [participants, setParticipants] = React.useState<ParticipantType[]>([])
    const [localStatuses, setLocalStatuses] = React.useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = React.useState(true)
    const [event, setEvent] = React.useState<SingleEvent | null>(null)
    const [modal, setModal] = React.useState<ModalState>(null)
    const [isActionLoading, setIsActionLoading] = React.useState(false)

    const fetchParticipants = React.useCallback(
        async (showLoader = true) => {
            if (showLoader) setIsLoading(true)
            const response = await getEventParticipantsService(eventId)
            if (response.success && response.data) {
                const eventData = response.data.event
                const participantsList = response.data.participants || []
                setEvent(eventData)
                setParticipants(participantsList)
                const statuses: Record<string, string> = {}
                participantsList.forEach((p: ParticipantType) => {
                    statuses[p.id] = p.status
                })
                setLocalStatuses(statuses)
            } else {
                toast.error(response.message || 'Failed to load participants list')
            }
            if (showLoader) setIsLoading(false)
        },
        [eventId]
    )

    React.useEffect(() => {
        fetchParticipants(true)
    }, [fetchParticipants])

    const handleSingleRowRefresh = async (regId: string) => {
        const response = await getEventParticipantsService(eventId)
        if (response.success) {
            const updatedRow = response.data?.participants.find(
                (p: ParticipantType) => p.id === regId
            )
            if (updatedRow) {
                setParticipants((prev) =>
                    prev.map((p) => (p.id === regId ? updatedRow : p))
                )
                setLocalStatuses((prev) => ({ ...prev, [regId]: updatedRow.status }))
                toast.success('Row data refreshed successfully!')
            } else {
                toast.error('Refresh failed!')
            }
        } else {
            toast.error('Failed to sync data from server')
        }
    }

    const handleStatusChange = (regId: string, newStatus: string) => {
        setLocalStatuses((prev) => ({ ...prev, [regId]: newStatus }))
    }

    const handleSaveStatus = async (regId: string, targetStatus: string) => {
        const response = await updateParticipantStatusService(regId, targetStatus)
        if (response.success) {
            toast.success('Status updated successfully!')
            setParticipants((prev) =>
                prev.map((p) => (p.id === regId ? { ...p, status: targetStatus as any } : p))
            )
        } else {
            toast.error(response.message || 'Update failed')
        }
    }

    // Delete flow
    const handleDeleteRow = (registrationId: string) => {
        setModal({ type: 'delete', registrationId })
    }

    const confirmDelete = async () => {
        if (modal?.type !== 'delete') return
        setIsActionLoading(true)
        const response = await deleteRegistrationService(modal.registrationId)
        setIsActionLoading(false)
        if (response.success) {
            toast.success('Registration deleted successfully!')
            setParticipants((prev) =>
                prev.filter((p) => p.id !== modal.registrationId)
            )
            setModal(null)
        } else {
            toast.error(response.message || 'Delete failed')
        }
    }

    // Block flow
    const handleBlockUser = (userId: string, registrationId: string) => {
        setModal({ type: 'block', userId, registrationId })
    }

    const confirmBlock = async () => {
        if (modal?.type !== 'block') return
        setIsActionLoading(true)
        const response = await banUserService(modal.userId)
        setIsActionLoading(false)
        if (response.success) {
            toast.success('User has been blocked successfully!')
            // Update all registrations of this user in this event to BANNED in local state
            setParticipants((prev) =>
                prev.map((p) =>
                    p.user.id === modal.userId ? { ...p, status: 'BANNED' as any } : p
                )
            )
            setLocalStatuses((prev) => {
                const next = { ...prev }
                participants.forEach((p) => {
                    if (p.user.id === modal.userId) next[p.id] = 'BANNED'
                })
                return next
            })
            setModal(null)
        } else {
            toast.error(response.message || 'Block failed')
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
        <div className="space-y-6 max-w-5xl mx-auto p-4">
            <div>
                <Link
                    href="/dashboard/my-events"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 mb-2"
                >
                    <ArrowLeft className="h-4 w-4" /> Back
                </Link>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Manage Participants
                </h1>
                <p className="text-slate-500 mt-1">
                    Manage event join requests, approval moderations, and user ban panels.
                </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                        {event?.title}
                    </h2>
                </div>
                <div className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 rounded-xl px-4 py-2.5 w-fit shadow-sm">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                            Event Date & Time
                        </span>
                        <span className="text-sm font-semibold text-slate-700">
                            {fmt(event?.startAt as string, 'date')} ·{' '}
                            {fmt(event?.startAt as string, 'time')}
                        </span>
                    </div>
                </div>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <ParticipantTableHeader />
                        <tbody className="divide-y divide-slate-100">
                            {participants.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-12 text-slate-400 font-medium"
                                    >
                                        No participants registered for this event yet.
                                    </td>
                                </tr>
                            ) : (
                                participants.map((participant) => (
                                    <ParticipantRow
                                        key={participant.id}
                                        participant={participant}
                                        localStatus={localStatuses[participant.id] || participant.status}
                                        onStatusChange={handleStatusChange}
                                        onSave={handleSaveStatus}
                                        onRefreshRow={handleSingleRowRefresh}
                                        onDeleteRow={handleDeleteRow}
                                        onBlockUser={handleBlockUser}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={modal?.type === 'delete'}
                title="Delete Registration"
                description="Are you sure you want to delete this registration? This action cannot be undone."
                confirmLabel="Delete"
                confirmClassName="bg-red-600 hover:bg-red-700 text-white"
                isLoading={isActionLoading}
                onConfirm={confirmDelete}
                onCancel={() => setModal(null)}
            />

            {/* Block Confirmation Modal */}
            <ConfirmModal
                isOpen={modal?.type === 'block'}
                title="Block User"
                description="Are you sure you want to block this user? They will not be able to join any of your future events, and their existing registrations will be updated accordingly."
                confirmLabel="Block User"
                confirmClassName="bg-amber-500 hover:bg-amber-600 text-white"
                isLoading={isActionLoading}
                onConfirm={confirmBlock}
                onCancel={() => setModal(null)}
            />
        </div>
    )
}