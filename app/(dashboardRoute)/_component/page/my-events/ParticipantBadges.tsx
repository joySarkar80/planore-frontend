import * as React from 'react'

type PaymentBadgeProps = {
    status: string
}

export function PaymentBadge({ status }: PaymentBadgeProps) {
    const styles: Record<string, string> = {
        PAID: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        UNPAID: 'bg-rose-50 text-rose-700 border-rose-200',
        FREE: 'bg-sky-50 text-sky-700 border-sky-200',
    }

    return (
        <span className={`inline-flex border px-2.5 py-1 rounded-xl text-xs font-bold ${styles[status] || 'bg-slate-50'}`}>
            {status}
        </span>
    )
}