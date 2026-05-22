'use client'

import { createReviewService } from '@/services/review';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // পোর্টাল ইম্পোর্ট করুন
import { toast } from 'sonner';


type ReviewModalProps = {
    isOpen: boolean;
    onClose: () => void;
    eventId: string;
    existingReview?: any;
    onReviewSubmit: () => void;
};

export default function ReviewModal({ isOpen, onClose, eventId, existingReview, onReviewSubmit }: ReviewModalProps) {
    const [rating, setRating] = useState(existingReview?.rating || 5);
    const [comment, setComment] = useState(existingReview?.comment || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mounted, setMounted] = useState(false);

    // SSR এবং Hydration ঠিক রাখার জন্য মাউন্ট চেক
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isOpen || !mounted) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const response = await createReviewService({ eventId, rating, comment });

        if (response.success) {
            toast.success("Review submitted successfully!");
            onReviewSubmit();
            onClose();
        } else {
            toast.error(response.message || "Failed to submit review");
        }
        setIsSubmitting(false);
    };

    // মডালের মূল UI স্ট্রাকচার
    const modalContent = (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative">
                <h2 className="text-xl font-bold text-slate-800 mb-4">
                    {existingReview ? 'View Your Review' : 'Leave a Review'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Rating (1-5)</label>
                        <input
                            type="number" min="1" max="5"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            disabled={!!existingReview || isSubmitting}
                            className="w-full border rounded-lg px-3 py-2 disabled:bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Comment</label>
                        <textarea
                            value={comment || ''}
                            onChange={(e) => setComment(e.target.value)}
                            disabled={!!existingReview || isSubmitting}
                            rows={4}
                            className="w-full border rounded-lg px-3 py-2 disabled:bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder={existingReview ? '' : 'Share your valuable experience...'}
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                        >
                            {existingReview ? 'Close' : 'Cancel'}
                        </button>
                        {!existingReview && (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-70 transition"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );

    // ডম ট্রির বাইরে document.body তে রেন্ডার করা হচ্ছে
    return createPortal(modalContent, document.body);
}