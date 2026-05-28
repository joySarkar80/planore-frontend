'use client'

import { X, Star, UserCircle } from 'lucide-react';

type ViewReviewModalProps = {
    isOpen: boolean;
    onClose: () => void;
    review: {
        rating: number;
        comment?: string | null;
        createdAt: string;
        user?: { name: string; avatar?: string | null };
    } | null;
    eventTitle: string;
};

export default function ViewReviewModal({
    isOpen,
    onClose,
    review,
    eventTitle,
}: ViewReviewModalProps) {
    if (!isOpen || !review) return null;

    const fmtDate = (d: string) =>
        new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const fmtTime = (d: string) =>
        new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Your Review</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="px-6 py-5 space-y-4">
                    {/* Event title */}
                    <p className="text-sm font-semibold text-gray-700 line-clamp-1">{eventTitle}</p>

                    {/* Stars */}
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`h-6 w-6 ${star <= review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-200'
                                    }`}
                            />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">{review.rating}/5</span>
                    </div>

                    {/* Comment */}
                    {review.comment ? (
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {review.comment}
                        </p>
                    ) : (
                        <p className="text-sm text-gray-400 italic">No comment provided.</p>
                    )}

                    {/* Footer */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
                        {review.user && (
                            <div className="flex items-center gap-2">
                                {review.user.avatar ? (
                                    <img
                                        src={review.user.avatar}
                                        alt={review.user.name}
                                        className="h-6 w-6 rounded-full object-cover"
                                    />
                                ) : (
                                    <UserCircle className="h-6 w-6 text-gray-400" />
                                )}
                                <span className="text-xs font-medium text-gray-700">
                                    {review.user.name}
                                </span>
                            </div>
                        )}
                        <span className="text-xs text-gray-400 ml-auto">
                            {fmtDate(review.createdAt)} · {fmtTime(review.createdAt)}
                        </span>
                    </div>
                </div>

                <div className="px-6 pb-5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}