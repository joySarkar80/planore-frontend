'use client';

import { ConfirmModalState } from './types';

interface ConfirmUserModalProps {
    modalState: ConfirmModalState;
    actionLoading: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmUserModal({
    modalState,
    actionLoading,
    onClose,
    onConfirm,
}: ConfirmUserModalProps) {
    if (!modalState.open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {modalState.action === 'delete' ? 'Delete User' : 'Ban User'}
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                    {modalState.action === 'delete'
                        ? `Are you sure you want to permanently delete "${modalState.userName}"? All their data will be removed.`
                        : `Are you sure you want to ban "${modalState.userName}"? They will lose access to the platform.`}
                </p>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={actionLoading}
                        className={`px-4 py-2 text-white rounded-lg text-sm font-medium disabled:opacity-60 transition-colors ${
                            modalState.action === 'delete'
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-orange-600 hover:bg-orange-700'
                        }`}
                    >
                        {actionLoading ? 'Processing…' : 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    );
}