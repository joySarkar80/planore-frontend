'use client'

import * as React from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type DeleteConfirmModalProps = {
    isOpen: boolean
    isDeleting: boolean
    onClose: () => void
    onConfirm: () => void
}

export default function DeleteConfirmModal({
    isOpen,
    isDeleting,
    onClose,
    onConfirm,
}: DeleteConfirmModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform scale-100 animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="h-16 w-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                        <Trash2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Delete Event?</h3>
                    <p className="text-slate-500 font-medium">
                        Are you sure you want to delete this event? This action cannot be undone and all registrations will be removed.
                    </p>

                    <div className="flex gap-3 w-full mt-6">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={isDeleting}
                            className="flex-1 rounded-xl h-12 font-bold"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="flex-1 rounded-xl h-12 font-bold bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isDeleting ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                'Confirm Delete'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}