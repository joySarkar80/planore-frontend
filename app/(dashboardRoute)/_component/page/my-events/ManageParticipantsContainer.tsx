'use client'

import * as React from 'react'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { getEventParticipantsService, updateParticipantStatusService } from '@/services/registrations/clientRegistration'
import { ParticipantType } from '@/types/registration'
import { ParticipantTableHeader } from './ParticipantTableHeader'
import { ParticipantRow } from './ParticipantRow'

type ManageParticipantsContainerProps = {
    eventId: string
}

export default function ManageParticipantsContainer({ eventId }: ManageParticipantsContainerProps) {
    const [participants, setParticipants] = React.useState<ParticipantType[]>([])
    const [localStatuses, setLocalStatuses] = React.useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = React.useState(true)

    const fetchParticipants = React.useCallback(async (showLoader = true) => {
        if (showLoader) setIsLoading(true)
        const response = await getEventParticipantsService(eventId)
        if (response.success) {
            setParticipants(response.data)
            const statuses: Record<string, string> = {}
            response.data.forEach(p => {
                statuses[p.id] = p.status
            })
            setLocalStatuses(statuses)
        } else {
            toast.error(response.message || 'Failed to load participants list')
        }
        if (showLoader) setIsLoading(false)
    }, [eventId])

    React.useEffect(() => {
        fetchParticipants(true)
    }, [fetchParticipants])

    const handleSingleRowRefresh = async (regId: string) => {
        const response = await getEventParticipantsService(eventId)
        if (response.success) {
            const updatedRow = response.data.find(p => p.id === regId)
            if (updatedRow) {
                setParticipants(prev => prev.map(p => p.id === regId ? updatedRow : p))
                setLocalStatuses(prev => ({ ...prev, [regId]: updatedRow.status }))
                toast.success('Row data refreshed successfully!')
            }
        } else {
            toast.error('Failed to sync data from server')
        }
    }

    const handleStatusChange = (regId: string, newStatus: string) => {
        setLocalStatuses(prev => ({ ...prev, [regId]: newStatus }))
    }

    const handleSaveStatus = async (regId: string, targetStatus: string) => {
        const response = await updateParticipantStatusService(regId, targetStatus)
        if (response.success) {
            toast.success('Status updated successfully!')
            setParticipants(prev =>
                prev.map(p => p.id === regId ? { ...p, status: targetStatus as any } : p)
            )
        } else {
            toast.error(response.message || 'Update failed')
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
                <Link href="/dashboard/my-events" className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 mb-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Events
                </Link>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manage Participants</h1>
                <p className="text-slate-500 mt-1">Manage event join requests, approval moderations, and user ban panels.</p>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <ParticipantTableHeader />
                        <tbody className="divide-y divide-slate-100">
                            {participants.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-slate-400 font-medium">
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
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}