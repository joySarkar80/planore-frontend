import * as React from 'react'

export function ParticipantTableHeader() {
    return (
        <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
                <th className="p-4 font-bold text-slate-700 text-sm">Name</th>
                <th className="p-4 font-bold text-slate-700 text-sm">Email Address</th>
                <th className="p-4 font-bold text-slate-700 text-sm">Payment</th>
                <th className="p-4 font-bold text-slate-700 text-sm">Join Status</th>
                <th className="p-4 font-bold text-slate-700 text-sm text-right">Action</th>
            </tr>
        </thead>
    )
}