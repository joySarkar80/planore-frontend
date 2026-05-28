import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";
import { ReviewCardReview } from "@/app/_component/review/type";


interface EditReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: ReviewCardReview | null;
    onUpdate: (rating: number, comment: string) => Promise<void>;
    isUpdating: boolean;
}

export default function EditReviewModal({ isOpen, onClose, review, onUpdate, isUpdating }: EditReviewModalProps) {
    const [editComment, setEditComment] = useState("");
    const [editRating, setEditRating] = useState(5);

    useEffect(() => {
        if (review && isOpen) {
            setEditComment(review.comment || "");
            setEditRating(review.rating);
        }
    }, [review, isOpen]);

    if (!isOpen || !review) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Edit Review</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={24}
                                onClick={() => setEditRating(star)}
                                className={`cursor-pointer ${star <= editRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                    <textarea
                        rows={4}
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Update your review..."
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onUpdate(editRating, editComment)}
                        disabled={isUpdating}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isUpdating ? 'Updating...' : 'Update Review'}
                    </button>
                </div>
            </div>
        </div>
    );
}