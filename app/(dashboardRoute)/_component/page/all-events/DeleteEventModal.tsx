'use client';

interface DeleteEventModalProps {
    open: boolean;
    title: string;
    deletingId: string | null;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteEventModal({
    open,
    title,
    deletingId,
    onClose,
    onConfirm,
}: DeleteEventModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Event</h3>
                <p className="text-sm text-gray-600 mb-6">
                    Are you sure you want to delete{' '}
                    <span className="font-medium text-gray-900">"{title}"</span>?
                    This action cannot be undone.
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
                        disabled={!!deletingId}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-60 transition-colors"
                    >
                        {deletingId ? 'Deleting…' : 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    );
}