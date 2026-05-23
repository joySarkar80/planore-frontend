"use client";

import { useEffect, useState } from "react";
import { Star, Edit, Trash2, X, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { getMyReviewsService, updateReviewService, deleteReviewService } from "@/services/review";
import { useRouter } from "next/navigation";

// Type Definition
type Review = {
    id: string;
    eventId: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    event: {
        title: string;
        startAt: string;
        venue: string | null;
    };
};

export default function MyReviewsContainer() {
    const router = useRouter();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // Edit Form State
    const [editComment, setEditComment] = useState("");
    const [editRating, setEditRating] = useState(5);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchReviews = async () => {
        setLoading(true);
        const res = await getMyReviewsService();
        if (res?.success) {
            setReviews(res.data);
        } else {
            toast.error(res?.message || "Failed to load reviews");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // Handlers
    const openReadMore = (review: Review) => {
        setSelectedReview(review);
        setIsReadMoreOpen(true);
    };

    const openEdit = (review: Review) => {
        setSelectedReview(review);
        setEditComment(review.comment || "");
        setEditRating(review.rating);
        setIsEditOpen(true);
    };

    const openDelete = (review: Review) => {
        setSelectedReview(review);
        setIsDeleteOpen(true);
    };

    const handleUpdate = async () => {
        if (!selectedReview) return;
        setIsUpdating(true);
        const res = await updateReviewService(selectedReview.id, {
            rating: editRating,
            comment: editComment
        });

        if (res?.success) {
            toast.success("Review updated successfully!");
            setIsEditOpen(false);
            fetchReviews(); // Local data refresh
            router.refresh(); // Next.js App Router cache refresh
        } else {
            toast.error(res?.message || "Failed to update");
        }
        setIsUpdating(false);
    };

    const handleDelete = async () => {
        if (!selectedReview) return;
        setIsUpdating(true);
        const res = await deleteReviewService(selectedReview.id);

        if (res?.success) {
            toast.success("Review deleted successfully!");
            setIsDeleteOpen(false);
            fetchReviews();
            router.refresh();
        } else {
            toast.error(res?.message || "Failed to delete");
        }
        setIsUpdating(false);
    };

    // Text Truncation Utility
    const truncateText = (text: string | null, maxWords: number) => {
        if (!text) return "";
        const words = text.split(" ");
        if (words.length <= maxWords) return text;
        return words.slice(0, maxWords).join(" ") + "...";
    };

    if (loading) return <div className="p-8 text-center animate-pulse">Loading your reviews...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">My Reviews</h2>

            {reviews.length === 0 ? (
                <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500">You haven't written any reviews yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => {
                        const wordCount = review.comment ? review.comment.split(" ").length : 0;
                        const isLongText = wordCount > 15;

                        return (
                            <div key={review.id} className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white flex flex-col justify-between">
                                <div>
                                    <h3 className="font-semibold text-lg line-clamp-1">{review.event.title}</h3>
                                    <p className="text-xs text-gray-500 mb-3">
                                        {new Date(review.event.startAt).toLocaleDateString()} {review.event.venue && `• ${review.event.venue}`}
                                    </p>

                                    <div className="flex items-center mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                                        ))}
                                    </div>

                                    <div className="text-sm text-gray-700 mb-4 break-words">
                                        {truncateText(review.comment, 15)}
                                        {isLongText && (
                                            <button
                                                onClick={() => openReadMore(review)}
                                                className="text-blue-600 font-medium ml-1 hover:underline text-xs"
                                            >
                                                Read More
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-auto">
                                    <button
                                        onClick={() => openEdit(review)}
                                        className="flex items-center gap-1.5 text-sm text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition"
                                    >
                                        <Edit size={14} /> Edit
                                    </button>
                                    <button
                                        onClick={() => openDelete(review)}
                                        className="flex items-center gap-1.5 text-sm text-red-600 bg-red-50 px-3 py-1.5 rounded-md hover:bg-red-100 transition"
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Read More Modal */}
            {isReadMoreOpen && selectedReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold">{selectedReview.event.title}</h3>
                            <button onClick={() => setIsReadMoreOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {selectedReview.comment}
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditOpen && selectedReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Edit Review</h3>
                            <button onClick={() => setIsEditOpen(false)} className="text-gray-400 hover:text-gray-600">
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
                                onClick={() => setIsEditOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                disabled={isUpdating}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isUpdating ? 'Updating...' : 'Update Review'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteOpen && selectedReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl text-center">
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Delete Review?</h3>
                        <p className="text-gray-500 text-sm mb-6">
                            Are you sure you want to delete this review for "{selectedReview.event.title}"? This action cannot be undone.
                        </p>

                        <div className="flex gap-3 w-full">
                            <button
                                onClick={() => setIsDeleteOpen(false)}
                                className="flex-1 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isUpdating}
                                className="flex-1 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                            >
                                {isUpdating ? 'Deleting...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}