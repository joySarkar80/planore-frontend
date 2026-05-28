'use client'

import * as React from 'react'
import { Loader2, ArrowLeft, Calendar } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { getEventParticipantsService, updateParticipantStatusService } from '@/services/registrations/clientRegistration'
import { ParticipantType } from '@/types/registration'
import { ParticipantTableHeader } from './ParticipantTableHeader'
import { ParticipantRow } from './ParticipantRow'
import { SingleEvent } from '@/types/event'

type ManageParticipantsContainerProps = {
    eventId: string
}

export default function ManageParticipantsContainer({ eventId }: ManageParticipantsContainerProps) {
    const [participants, setParticipants] = React.useState<ParticipantType[]>([])
    const [localStatuses, setLocalStatuses] = React.useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = React.useState(true)
    const [event, setEvent] = React.useState<SingleEvent | null>(null);

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

    const fetchParticipants = React.useCallback(async (showLoader = true) => {
        if (showLoader) setIsLoading(true)
        const response = await getEventParticipantsService(eventId)
        // console.log(response)

        if (response.success && response.data) {
            const eventData = response.data.event;
            const participantsList = response.data.participants || [];

            setEvent(eventData)
            setParticipants(participantsList)

            const statuses: Record<string, string> = {}
            participantsList.forEach(p => {
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
            const updatedRow = response.data?.participants.find(p => p.id === regId)
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
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Participants</h1>
                <p className="text-slate-500 mt-1">Manage event join requests, approval moderations, and user ban panels.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    {/* <span className="text-xs font-semibold text-indigo-600 tracking-wider uppercase">Selected Event</span> */}
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                        {event?.title}
                    </h2>
                </div>
                <div className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 rounded-xl px-4 py-2.5 w-fit shadow-sm">
                    {/* আপনি চাইলে এখানে lucide-react থেকে Calendar আইকন ইম্পোর্ট করে বসাতে পারেন */}
                    <div className="flex flex-col">
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Event Date & Time</span>
                        <span className="text-sm font-semibold text-slate-700">
                        {fmt(event?.startAt as string)} · {fmtTime(event?.startAt as string)}
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