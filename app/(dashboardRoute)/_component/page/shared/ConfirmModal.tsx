'use client'

import * as React from 'react'
import { Loader2, X } from 'lucide-react'

type ConfirmModalProps = {
    isOpen: boolean
    title: string
    description: string
    confirmLabel?: string
    confirmClassName?: string
    isLoading?: boolean
    onConfirm: () => void
    onCancel: () => void
}

export function ConfirmModal({
    isOpen,
    title,
    description,
    confirmLabel = 'Confirm',
    confirmClassName = 'bg-red-600 hover:bg-red-700 text-white',
    isLoading = false,
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onCancel}
            />
            <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                    <X className="h-4 w-4" />
                </button>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 mb-6">{description}</p>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors disabled:opacity-50 ${confirmClassName}`}
                    >
                        {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}