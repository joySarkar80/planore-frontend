import { Trash2 } from "lucide-react";
import { Review } from "../my-reviews/types";
import { ReviewCardReview } from "@/app/_component/review/type";


interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: ReviewCardReview | null;
    onDelete: () => Promise<void>;
    isDeleting: boolean;
}

export default function DeleteConfirmModal({ isOpen, onClose, review, onDelete, isDeleting }: DeleteConfirmModalProps) {
    if (!isOpen || !review) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl text-center">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Delete Review?</h3>
                <p className="text-gray-500 text-sm mb-6">
                    Are you sure you want to delete this review for "{review.event.title}"? This action cannot be undone.
                </p>

                <div className="flex gap-3 w-full">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        disabled={isDeleting}
                        className="flex-1 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                        {isDeleting ? 'Deleting...' : 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    );
}