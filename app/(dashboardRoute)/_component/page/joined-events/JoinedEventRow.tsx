'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import ReviewModal from './ReviewModal';
import { payPrivateEvent } from '@/services/registrations/clientRegistration';

export function JoinedEventRow({ registration, onRefresh }: { registration: any; onRefresh: () => void; }) {
    const { event, status, paymentStatus } = registration;

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const isApproved = status === 'APPROVED';
    const isPrivatePaidEvent = event.visibility === 'PRIVATE' && Number(event.registrationFee) > 0;
    const hasPaid = paymentStatus === 'PAID';

    const eventStartTime = new Date(event.startAt).getTime();
    const currentTime = new Date().getTime();
    const minutesPassed = (currentTime - eventStartTime) / (1000 * 60);
    const is3MinutesPassed = minutesPassed >= 1;

    const existingReview = event.reviews?.length > 0 ? event.reviews[0] : null;
    const hasReviewed = !!existingReview;

    const showPayButton = isPrivatePaidEvent && !hasPaid;

    const handleReviewClick = () => {
        if (hasReviewed) {
            setIsReviewModalOpen(true);
            return;
        }

        if (!is3MinutesPassed) {
            toast.error("Reviews cannot be submitted at this moment. You can submit a review 2 minutes after the event starts.");
            return;
        }

        
        setIsReviewModalOpen(true);
    };

    const handlePrivatePayment = async (eventId: string) => {
        try {
            setLoading(true);

            const response = await payPrivateEvent(eventId);
            if (response.success && response.data?.checkoutUrl) {
                window.location.assign(response.data.checkoutUrl);
                return;
            }

            toast.error(response.message || 'Failed to initialize payment');
            setLoading(false);

        } catch (error) {
            toast.error('Something went wrong');
            setLoading(false);
        }
    };

    return (
        <>
            <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-slate-800">{event.title}</td>

                <td className="p-4">
                    <span
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                    >
                        {status}
                    </span>
                </td>

                <td className="p-4">
                    <span
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${paymentStatus === 'PAID' ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : paymentStatus === 'FREE' ? 'bg-slate-100 text-slate-600 border-slate-200'
                                : 'bg-orange-50 text-orange-700 border-orange-200'
                            }`}
                    >
                        {paymentStatus}
                    </span>
                </td>

                <td className="p-4 flex items-center justify-end gap-2">
                    <Link
                        href={`/events/${event.id}`}
                        className="px-3 py-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
                    >
                        View Event
                    </Link>

                    {showPayButton && (
                        <button
                            onClick={() => handlePrivatePayment(event.id)}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-white bg-slate-900 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition"
                        >
                            {loading && <Loader2 className="h-3 w-3 animate-spin" />}
                            Pay
                        </button>
                    )}

                    {hasReviewed ? (
                        <button
                            onClick={handleReviewClick}
                            className="px-3 py-1.5 text-sm font-semibold text-purple-600 border border-purple-200 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
                        >
                            View Your Review
                        </button>
                    ) : (
                        <button
                            onClick={handleReviewClick}
                            className="px-3 py-1.5 text-sm font-semibold text-indigo-600 border border-indigo-200 bg-indigo-50 rounded-lg hover:bg-slate-50 transition"
                        >
                            Leave a Review
                        </button>
                    )}
                </td>
            </tr>

            {isReviewModalOpen && (
                <ReviewModal
                    isOpen={isReviewModalOpen}
                    onClose={() => setIsReviewModalOpen(false)}
                    eventId={event.id}
                    existingReview={existingReview}
                    onReviewSubmit={onRefresh}
                />
            )}
        </>
    );
}
