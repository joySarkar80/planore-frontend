'use client'

import * as React from 'react'
import { Loader2, Save, RefreshCw } from 'lucide-react'
import { ParticipantType } from '@/types/registration'
import { PaymentBadge } from './ParticipantBadges'

type ParticipantRowProps = {
    participant: ParticipantType
    localStatus: string
    onStatusChange: (regId: string, newStatus: string) => void
    onSave: (regId: string, targetStatus: string) => Promise<void>
    onRefreshRow: (regId: string) => Promise<void>
}

export function ParticipantRow({
    participant,
    localStatus,
    onStatusChange,
    onSave,
    onRefreshRow
}: ParticipantRowProps) {
    const [isSaving, setIsSaving] = React.useState(false)
    const [isRefreshing, setIsRefreshing] = React.useState(false)

    const currentDbStatus = participant.status
    const isSaveDisabled = currentDbStatus === localStatus || isSaving || isRefreshing

    const isApproveDisabled = false
    const isRejectDisabled = currentDbStatus === 'APPROVED' || currentDbStatus === 'BANNED'
    const isBanDisabled = currentDbStatus === 'PENDING' || currentDbStatus === 'INVITED' || currentDbStatus === 'REJECTED'

    const handleLocalSave = async () => {
        setIsSaving(true)
        await onSave(participant.id, localStatus)
        setIsSaving(false)
    }

    const handleLocalRefresh = async () => {
        setIsRefreshing(true)
        await onRefreshRow(participant.id)
        setIsRefreshing(false)
    }

    return (
        <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="p-4 font-bold text-slate-800">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center overflow-hidden">
                        {participant.user.avatar ? (
                            <img src={participant.user.avatar} alt="" className="object-cover h-full w-full" />
                        ) : (
                            participant.user.name.slice(0, 2).toUpperCase()
                        )}
                    </div>
                    {participant.user.name}
                </div>
            </td>
            <td className="p-4 text-slate-600 font-semibold text-sm">
                {participant.user.email}
            </td>
            <td className="p-4">
                <PaymentBadge status={participant.paymentStatus} />
            </td>
            <td className="p-4">
                <div className="flex items-center gap-2">
                    <select
                        value={localStatus}
                        onChange={(e) => onStatusChange(participant.id, e.target.value)}
                        disabled={isSaving || isRefreshing}
                        className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-white disabled:opacity-60"
                    >
                        {currentDbStatus === 'INVITED' && <option value="INVITED">INVITED</option>}
                        {currentDbStatus === 'PENDING' && <option value="PENDING">PENDING</option>}
                        {currentDbStatus === 'REJECTED' && <option value="REJECTED">REJECTED</option>}

                        <option value="APPROVED" disabled={isApproveDisabled}>APPROVE</option>
                        <option value="REJECTED" disabled={isRejectDisabled}>REJECT</option>
                        <option value="BANNED" disabled={isBanDisabled}>BAN</option>
                    </select>

                    <button
                        type="button"
                        title="Refresh this row"
                        disabled={isRefreshing || isSaving}
                        onClick={handleLocalRefresh}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-indigo-600' : ''}`} />
                    </button>
                </div>
            </td>
            <td className="p-4 text-right">
                <button
                    type="button"
                    disabled={isSaveDisabled}
                    onClick={handleLocalSave}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:hover:bg-indigo-600"
                >
                    {isSaving ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                        <Save className="h-3.5 w-3.5" />
                    )}
                    Save
                </button>
            </td>
        </tr>
    )
}